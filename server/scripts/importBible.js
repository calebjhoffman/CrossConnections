import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { XMLParser } from 'fast-xml-parser'
import prisma from '../utils/prisma.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const USFX_FILE = path.join(__dirname, '../data/engwebp_usfx.xml')

const CANON_BOOKS = [
  ['GEN', 'Genesis', 'genesis', 'OT'],
  ['EXO', 'Exodus', 'exodus', 'OT'],
  ['LEV', 'Leviticus', 'leviticus', 'OT'],
  ['NUM', 'Numbers', 'numbers', 'OT'],
  ['DEU', 'Deuteronomy', 'deuteronomy', 'OT'],
  ['JOS', 'Joshua', 'joshua', 'OT'],
  ['JDG', 'Judges', 'judges', 'OT'],
  ['RUT', 'Ruth', 'ruth', 'OT'],
  ['1SA', '1 Samuel', '1-samuel', 'OT'],
  ['2SA', '2 Samuel', '2-samuel', 'OT'],
  ['1KI', '1 Kings', '1-kings', 'OT'],
  ['2KI', '2 Kings', '2-kings', 'OT'],
  ['1CH', '1 Chronicles', '1-chronicles', 'OT'],
  ['2CH', '2 Chronicles', '2-chronicles', 'OT'],
  ['EZR', 'Ezra', 'ezra', 'OT'],
  ['NEH', 'Nehemiah', 'nehemiah', 'OT'],
  ['EST', 'Esther', 'esther', 'OT'],
  ['JOB', 'Job', 'job', 'OT'],
  ['PSA', 'Psalms', 'psalms', 'OT'],
  ['PRO', 'Proverbs', 'proverbs', 'OT'],
  ['ECC', 'Ecclesiastes', 'ecclesiastes', 'OT'],
  ['SNG', 'Song of Solomon', 'song-of-solomon', 'OT'],
  ['ISA', 'Isaiah', 'isaiah', 'OT'],
  ['JER', 'Jeremiah', 'jeremiah', 'OT'],
  ['LAM', 'Lamentations', 'lamentations', 'OT'],
  ['EZK', 'Ezekiel', 'ezekiel', 'OT'],
  ['DAN', 'Daniel', 'daniel', 'OT'],
  ['HOS', 'Hosea', 'hosea', 'OT'],
  ['JOL', 'Joel', 'joel', 'OT'],
  ['AMO', 'Amos', 'amos', 'OT'],
  ['OBA', 'Obadiah', 'obadiah', 'OT'],
  ['JON', 'Jonah', 'jonah', 'OT'],
  ['MIC', 'Micah', 'micah', 'OT'],
  ['NAM', 'Nahum', 'nahum', 'OT'],
  ['HAB', 'Habakkuk', 'habakkuk', 'OT'],
  ['ZEP', 'Zephaniah', 'zephaniah', 'OT'],
  ['HAG', 'Haggai', 'haggai', 'OT'],
  ['ZEC', 'Zechariah', 'zechariah', 'OT'],
  ['MAL', 'Malachi', 'malachi', 'OT'],
  ['MAT', 'Matthew', 'matthew', 'NT'],
  ['MRK', 'Mark', 'mark', 'NT'],
  ['LUK', 'Luke', 'luke', 'NT'],
  ['JHN', 'John', 'john', 'NT'],
  ['ACT', 'Acts', 'acts', 'NT'],
  ['ROM', 'Romans', 'romans', 'NT'],
  ['1CO', '1 Corinthians', '1-corinthians', 'NT'],
  ['2CO', '2 Corinthians', '2-corinthians', 'NT'],
  ['GAL', 'Galatians', 'galatians', 'NT'],
  ['EPH', 'Ephesians', 'ephesians', 'NT'],
  ['PHP', 'Philippians', 'philippians', 'NT'],
  ['COL', 'Colossians', 'colossians', 'NT'],
  ['1TH', '1 Thessalonians', '1-thessalonians', 'NT'],
  ['2TH', '2 Thessalonians', '2-thessalonians', 'NT'],
  ['1TI', '1 Timothy', '1-timothy', 'NT'],
  ['2TI', '2 Timothy', '2-timothy', 'NT'],
  ['TIT', 'Titus', 'titus', 'NT'],
  ['PHM', 'Philemon', 'philemon', 'NT'],
  ['HEB', 'Hebrews', 'hebrews', 'NT'],
  ['JAS', 'James', 'james', 'NT'],
  ['1PE', '1 Peter', '1-peter', 'NT'],
  ['2PE', '2 Peter', '2-peter', 'NT'],
  ['1JN', '1 John', '1-john', 'NT'],
  ['2JN', '2 John', '2-john', 'NT'],
  ['3JN', '3 John', '3-john', 'NT'],
  ['JUD', 'Jude', 'jude', 'NT'],
  ['REV', 'Revelation', 'revelation', 'NT'],
]

const CHUNK_SIZE = 500

function cleanVerseText(raw) {
  return raw
    .replace(/<f[\s\S]*?<\/f>/g, '')
    .replace(/<ve\s*\/>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim()
}

function getBlockInfo(tag) {
  const styleMatch = tag.match(/style="([^"]+)"/)
  const levelMatch = tag.match(/level="(\d+)"/)

  const style = styleMatch?.[1] || ''
  const level = levelMatch ? Number(levelMatch[1]) : null

  if (style.startsWith('q')) {
    return {
      blockType: 'poetry',
      blockLevel: level || Number(style.replace('q', '')) || 1,
    }
  }

  return {
    blockType: 'paragraph',
    blockLevel: null,
  }
}

function extractBookVersesFromXml(xml, code) {
  const bookMatch = xml.match(
    new RegExp(`<book id="${code}">([\\s\\S]*?)<\\/book>`)
  )

  if (!bookMatch) return []

  const bookXml = bookMatch[1]
  const rows = []

  const chapterParts = bookXml.split(/<c id="(\d+)"\s*\/>/g)

  for (let i = 1; i < chapterParts.length; i += 2) {
    const chapter = Number(chapterParts[i])
    const chapterXml = chapterParts[i + 1] || ''

    let paragraphIndex = 0

    const blockRegex = /<(p|q)([^>]*)>([\s\S]*?)<\/\1>/g
    let blockMatch

    while ((blockMatch = blockRegex.exec(chapterXml)) !== null) {
      paragraphIndex += 1

      const tag = `<${blockMatch[1]}${blockMatch[2]}>`
      const blockXml = blockMatch[3]
      const blockInfo = getBlockInfo(tag)

      const verseRegex =
        /<v id="(\d+)"[^>]*\/>([\s\S]*?)(?=<v id="\d+"[^>]*\/>|$)/g

      let verseMatch
      let isFirstVerseInBlock = true

      while ((verseMatch = verseRegex.exec(blockXml)) !== null) {
        const verse = Number(verseMatch[1])
        const text = cleanVerseText(verseMatch[2])

        if (!text) continue

        rows.push({
          chapter,
          verse,
          text,
          paragraphIndex,
          paragraphStart: isFirstVerseInBlock,
          blockType: blockInfo.blockType,
          blockLevel: blockInfo.blockLevel,
          headingBefore: null,
        })

        isFirstVerseInBlock = false
      }
    }
  }

  return rows
}

async function main() {
  if (!fs.existsSync(USFX_FILE)) {
    throw new Error(`USFX file not found at: ${USFX_FILE}`)
  }

  console.log('Reading USFX file...')
  const xml = fs.readFileSync(USFX_FILE, 'utf8')

  console.log('Parsing XML...')
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    preserveOrder: false,
    trimValues: true,
  })

  parser.parse(xml)

  console.log('Creating/updating translation...')
  const translation = await prisma.bibleTranslation.upsert({
    where: {
      code: 'WEB',
    },
    update: {
      name: 'World English Bible Protestant Edition',
      language: 'en',
      source: 'eBible.org engwebp USFX',
      isDefault: true,
    },
    create: {
      name: 'World English Bible Protestant Edition',
      code: 'WEB',
      language: 'en',
      source: 'eBible.org engwebp USFX',
      isDefault: true,
    },
  })

  const bookCodeToDbBook = new Map()

  console.log('Creating/updating canonical books...')

  for (let index = 0; index < CANON_BOOKS.length; index += 1) {
    const [code, name, slug, testament] = CANON_BOOKS[index]

    const dbBook = await prisma.bibleBook.upsert({
      where: {
        slug,
      },
      update: {
        name,
        testament,
        order: index + 1,
      },
      create: {
        name,
        slug,
        testament,
        order: index + 1,
      },
    })

    bookCodeToDbBook.set(code, dbBook)
  }

  const verseRows = []

  console.log('Extracting verses...')

  for (const [code] of CANON_BOOKS) {
    const dbBook = bookCodeToDbBook.get(code)

    const verses = extractBookVersesFromXml(xml, code)

    verses.forEach((verse) => {
      verseRows.push({
        translationId: translation.id,
        bookId: dbBook.id,
        chapter: verse.chapter,
        verse: verse.verse,
        text: verse.text,
        paragraphIndex: verse.paragraphIndex,
        paragraphStart: verse.paragraphStart,
        blockType: verse.blockType,
        blockLevel: verse.blockLevel,
        headingBefore: verse.headingBefore,
      })
    })

    console.log(`${dbBook.name}: ${verses.length} verses`)
  }

  console.log(`Total verses prepared: ${verseRows.length}`)

  console.log('Deleting existing WEB verses...')

  await prisma.bibleVerse.deleteMany({
    where: {
      translationId: translation.id,
    },
  })

  console.log('Importing verses in chunks...')

  for (let i = 0; i < verseRows.length; i += CHUNK_SIZE) {
    const chunk = verseRows.slice(i, i + CHUNK_SIZE)

    await prisma.bibleVerse.createMany({
      data: chunk,
      skipDuplicates: true,
    })

    console.log(
      `Imported ${Math.min(i + CHUNK_SIZE, verseRows.length)} / ${verseRows.length}`
    )
  }

  console.log('Bible import complete.')
}

main()
  .catch((err) => {
    console.error('Bible import failed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })