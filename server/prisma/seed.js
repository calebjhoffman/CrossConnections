import prisma from '../utils/prisma.js'

const timelineEvents = [
  {
    title: 'Creation',
    slug: 'creation',
    summary: 'God creates the heavens, the earth, and all living things.',
    description:
      'The biblical story begins with God creating everything from nothing. Creation establishes God as the source of life, order, goodness, and purpose. Humanity is created in God’s image and given a unique role within creation.',
    orderIndex: 1,
    era: 'Beginnings',
    category: 'Creation',
    period: 'Beginnings',
    dateLabel: 'Before recorded history',
    passages: [
      {
        book: 'Genesis',
        chapterStart: 1,
        verseStart: 1,
        chapterEnd: 2,
        verseEnd: 3,
        label: 'Genesis 1:1–2:3',
      },
    ],
  },
  {
    title: 'The Fall',
    slug: 'the-fall',
    summary: 'Sin enters the world through Adam and Eve’s disobedience.',
    description:
      'Adam and Eve disobey God, bringing sin, shame, brokenness, and death into the human story. God also gives the first promise of future victory over evil.',
    orderIndex: 2,
    era: 'Beginnings',
    category: 'Sin and Promise',
    period: 'Beginnings',
    dateLabel: 'Before recorded history',
    passages: [
      {
        book: 'Genesis',
        chapterStart: 3,
        verseStart: 1,
        chapterEnd: 3,
        verseEnd: 24,
        label: 'Genesis 3:1–24',
      },
    ],
  },
  {
    title: 'Cain and Abel',
    slug: 'cain-and-abel',
    summary: 'The first murder shows sin spreading through the human family.',
    description:
      'Cain kills his brother Abel after God accepts Abel’s offering. This event shows how quickly sin grows from disobedience into jealousy, violence, and judgment.',
    orderIndex: 3,
    era: 'Beginnings',
    category: 'Sin and Judgment',
    period: 'Beginnings',
    dateLabel: 'Before Noah',
    passages: [
      {
        book: 'Genesis',
        chapterStart: 4,
        verseStart: 1,
        chapterEnd: 4,
        verseEnd: 16,
        label: 'Genesis 4:1–16',
      },
    ],
  },
  {
    title: 'The Flood',
    slug: 'the-flood',
    summary:
      'God judges the corruption of humanity and preserves Noah and his family.',
    description:
      'Human wickedness fills the earth, but Noah finds favor with God. Through the ark, God preserves Noah, his family, and the animals, then establishes a covenant marked by the rainbow.',
    orderIndex: 4,
    era: 'Beginnings',
    category: 'Judgment and Covenant',
    period: 'Noah',
    dateLabel: 'Before Abraham',
    passages: [
      {
        book: 'Genesis',
        chapterStart: 6,
        verseStart: 5,
        chapterEnd: 9,
        verseEnd: 17,
        label: 'Genesis 6:5–9:17',
      },
    ],
  },
  {
    title: 'The Tower of Babel',
    slug: 'tower-of-babel',
    summary:
      'Humanity gathers in pride, and God confuses their language and scatters them.',
    description:
      'The people build a city and tower to make a name for themselves. God confuses their language, scattering the nations across the earth.',
    orderIndex: 5,
    era: 'Beginnings',
    category: 'Nations',
    period: 'Beginnings',
    dateLabel: 'Before Abraham',
    passages: [
      {
        book: 'Genesis',
        chapterStart: 11,
        verseStart: 1,
        chapterEnd: 11,
        verseEnd: 9,
        label: 'Genesis 11:1–9',
      },
    ],
  },
  {
    title: 'The Call of Abraham',
    slug: 'call-of-abraham',
    summary:
      'God calls Abram and promises to bless all families of the earth through him.',
    description:
      'God calls Abram to leave his country and go to a land He will show him. This begins the covenant storyline that will shape Israel and point toward blessing for all nations.',
    orderIndex: 6,
    era: 'Patriarchs',
    category: 'Covenant',
    period: 'Abraham',
    dateLabel: 'c. 2000 BC',
    passages: [
      {
        book: 'Genesis',
        chapterStart: 12,
        verseStart: 1,
        chapterEnd: 12,
        verseEnd: 9,
        label: 'Genesis 12:1–9',
      },
    ],
  },
  {
    title: 'God’s Covenant with Abraham',
    slug: 'covenant-with-abraham',
    summary:
      'God promises Abraham descendants, land, and blessing through covenant.',
    description:
      'God confirms His promises to Abraham through covenant. Abraham believes God, and the promise becomes central to the story of Israel and the hope of blessing for the nations.',
    orderIndex: 7,
    era: 'Patriarchs',
    category: 'Covenant',
    period: 'Abraham',
    dateLabel: 'c. 2000 BC',
    passages: [
      {
        book: 'Genesis',
        chapterStart: 15,
        verseStart: 1,
        chapterEnd: 15,
        verseEnd: 21,
        label: 'Genesis 15:1–21',
      },
      {
        book: 'Genesis',
        chapterStart: 17,
        verseStart: 1,
        chapterEnd: 17,
        verseEnd: 14,
        label: 'Genesis 17:1–14',
      },
    ],
  },
  {
    title: 'Isaac Is Born',
    slug: 'isaac-is-born',
    summary:
      'God keeps His promise by giving Abraham and Sarah a son in their old age.',
    description:
      'Isaac’s birth shows that God’s covenant promise does not depend on human strength or timing. The promised family continues through Isaac.',
    orderIndex: 8,
    era: 'Patriarchs',
    category: 'Promise',
    period: 'Abraham',
    dateLabel: 'c. 2000 BC',
    passages: [
      {
        book: 'Genesis',
        chapterStart: 21,
        verseStart: 1,
        chapterEnd: 21,
        verseEnd: 7,
        label: 'Genesis 21:1–7',
      },
    ],
  },
  {
    title: 'Abraham Tested with Isaac',
    slug: 'abraham-tested-with-isaac',
    summary:
      'God tests Abraham, and provides a substitute sacrifice in place of Isaac.',
    description:
      'Abraham is asked to offer Isaac, the son of promise. God stops Abraham and provides a ram, showing both Abraham’s faith and God’s provision.',
    orderIndex: 9,
    era: 'Patriarchs',
    category: 'Faith and Provision',
    period: 'Abraham',
    dateLabel: 'c. 2000 BC',
    passages: [
      {
        book: 'Genesis',
        chapterStart: 22,
        verseStart: 1,
        chapterEnd: 22,
        verseEnd: 19,
        label: 'Genesis 22:1–19',
      },
    ],
  },
  {
    title: 'Jacob Receives the Covenant Blessing',
    slug: 'jacob-receives-covenant-blessing',
    summary:
      'The covenant promise continues through Jacob, later named Israel.',
    description:
      'Jacob receives the blessing connected to Abraham’s family line. Though the family is deeply flawed, God continues His covenant plan through Jacob.',
    orderIndex: 10,
    era: 'Patriarchs',
    category: 'Covenant Family',
    period: 'Jacob',
    dateLabel: 'c. 1900 BC',
    passages: [
      {
        book: 'Genesis',
        chapterStart: 27,
        verseStart: 1,
        chapterEnd: 28,
        verseEnd: 22,
        label: 'Genesis 27:1–28:22',
      },
    ],
  },
  {
    title: 'Jacob Becomes Israel',
    slug: 'jacob-becomes-israel',
    summary:
      'Jacob wrestles with God and receives the name Israel.',
    description:
      'Before meeting Esau again, Jacob wrestles through the night and is renamed Israel. This name becomes central to the identity of God’s covenant people.',
    orderIndex: 11,
    era: 'Patriarchs',
    category: 'Identity',
    period: 'Jacob',
    dateLabel: 'c. 1900 BC',
    passages: [
      {
        book: 'Genesis',
        chapterStart: 32,
        verseStart: 22,
        chapterEnd: 32,
        verseEnd: 32,
        label: 'Genesis 32:22–32',
      },
    ],
  },
  {
    title: 'Joseph Sold into Egypt',
    slug: 'joseph-sold-into-egypt',
    summary:
      'Joseph is betrayed by his brothers and taken to Egypt.',
    description:
      'Joseph’s brothers sell him into slavery, but God will use this evil act to preserve many lives. Joseph’s story prepares the way for Israel’s family to move into Egypt.',
    orderIndex: 12,
    era: 'Patriarchs',
    category: 'Providence',
    period: 'Joseph',
    dateLabel: 'c. 1900–1800 BC',
    passages: [
      {
        book: 'Genesis',
        chapterStart: 37,
        verseStart: 12,
        chapterEnd: 37,
        verseEnd: 36,
        label: 'Genesis 37:12–36',
      },
    ],
  },
  {
    title: 'Joseph Rises to Power',
    slug: 'joseph-rises-to-power',
    summary:
      'God raises Joseph to leadership in Egypt to preserve life during famine.',
    description:
      'Joseph interprets Pharaoh’s dreams and is placed over Egypt’s food supply. His suffering becomes the path God uses to save his family and many others.',
    orderIndex: 13,
    era: 'Patriarchs',
    category: 'Providence',
    period: 'Joseph',
    dateLabel: 'c. 1900–1800 BC',
    passages: [
      {
        book: 'Genesis',
        chapterStart: 41,
        verseStart: 1,
        chapterEnd: 41,
        verseEnd: 57,
        label: 'Genesis 41:1–57',
      },
    ],
  },
  {
    title: 'Israel’s Family Moves to Egypt',
    slug: 'israel-family-moves-to-egypt',
    summary:
      'Jacob and his family settle in Egypt during the famine.',
    description:
      'Joseph is reunited with his family, and Jacob’s household moves to Egypt. This sets the stage for Israel’s growth into a nation and later oppression.',
    orderIndex: 14,
    era: 'Patriarchs',
    category: 'Preservation',
    period: 'Joseph',
    dateLabel: 'c. 1800 BC',
    passages: [
      {
        book: 'Genesis',
        chapterStart: 45,
        verseStart: 1,
        chapterEnd: 46,
        verseEnd: 7,
        label: 'Genesis 45:1–46:7',
      },
    ],
  },
  {
    title: 'Israel Enslaved in Egypt',
    slug: 'israel-enslaved-in-egypt',
    summary:
      'A new Pharaoh oppresses the Israelites as they multiply in Egypt.',
    description:
      'The descendants of Israel grow numerous in Egypt. Pharaoh fears them and enslaves them, setting the stage for God’s deliverance through Moses.',
    orderIndex: 15,
    era: 'Exodus',
    category: 'Oppression',
    period: 'Egypt',
    dateLabel: 'Before the Exodus',
    passages: [
      {
        book: 'Exodus',
        chapterStart: 1,
        verseStart: 1,
        chapterEnd: 1,
        verseEnd: 22,
        label: 'Exodus 1:1–22',
      },
    ],
  },
  {
    title: 'The Birth and Rescue of Moses',
    slug: 'birth-and-rescue-of-moses',
    summary:
      'Moses is born under Pharaoh’s death order and rescued from the Nile.',
    description:
      'Moses is born during Israel’s oppression. His mother hides him, places him in a basket, and Pharaoh’s daughter raises him. God preserves the future deliverer of Israel.',
    orderIndex: 16,
    era: 'Exodus',
    category: 'Deliverer',
    period: 'Egypt',
    dateLabel: 'Before the Exodus',
    passages: [
      {
        book: 'Exodus',
        chapterStart: 2,
        verseStart: 1,
        chapterEnd: 2,
        verseEnd: 10,
        label: 'Exodus 2:1–10',
      },
    ],
  },
  {
    title: 'The Burning Bush',
    slug: 'burning-bush',
    summary:
      'God calls Moses to lead Israel out of Egypt.',
    description:
      'God appears to Moses in a burning bush and reveals His name. Moses is sent back to Egypt to confront Pharaoh and lead God’s people out of slavery.',
    orderIndex: 17,
    era: 'Exodus',
    category: 'Calling',
    period: 'Moses',
    dateLabel: 'c. 1446 BC',
    passages: [
      {
        book: 'Exodus',
        chapterStart: 3,
        verseStart: 1,
        chapterEnd: 4,
        verseEnd: 17,
        label: 'Exodus 3:1–4:17',
      },
    ],
  },
  {
    title: 'The Ten Plagues',
    slug: 'ten-plagues',
    summary:
      'God judges Egypt and displays His power over Pharaoh and Egypt’s gods.',
    description:
      'Through a series of plagues, God confronts Pharaoh’s pride and Egypt’s oppression. The plagues reveal God’s authority and prepare for Israel’s deliverance.',
    orderIndex: 18,
    era: 'Exodus',
    category: 'Judgment and Deliverance',
    period: 'Egypt',
    dateLabel: 'c. 1446 BC',
    passages: [
      {
        book: 'Exodus',
        chapterStart: 7,
        verseStart: 14,
        chapterEnd: 12,
        verseEnd: 32,
        label: 'Exodus 7:14–12:32',
      },
    ],
  },
  {
    title: 'The Passover',
    slug: 'passover',
    summary:
      'God delivers Israel through the blood of the Passover lamb.',
    description:
      'On the night of the final plague, Israel is protected by the blood of the lamb. Passover becomes a defining memorial of God’s redemption.',
    orderIndex: 19,
    era: 'Exodus',
    category: 'Redemption',
    period: 'Egypt',
    dateLabel: 'c. 1446 BC',
    passages: [
      {
        book: 'Exodus',
        chapterStart: 12,
        verseStart: 1,
        chapterEnd: 12,
        verseEnd: 32,
        label: 'Exodus 12:1–32',
      },
    ],
  },
  {
    title: 'The Exodus from Egypt',
    slug: 'exodus-from-egypt',
    summary:
      'God brings Israel out of slavery in Egypt.',
    description:
      'After generations of oppression, God delivers Israel from Egypt. The Exodus becomes one of the central acts of salvation in the Old Testament.',
    orderIndex: 20,
    era: 'Exodus',
    category: 'Deliverance',
    period: 'Moses',
    dateLabel: 'c. 1446 BC',
    passages: [
      {
        book: 'Exodus',
        chapterStart: 12,
        verseStart: 33,
        chapterEnd: 13,
        verseEnd: 22,
        label: 'Exodus 12:33–13:22',
      },
    ],
  },
  {
    title: 'Crossing the Red Sea',
    slug: 'crossing-the-red-sea',
    summary:
      'God parts the sea, rescues Israel, and defeats Pharaoh’s army.',
    description:
      'Trapped between Pharaoh’s army and the sea, Israel sees God’s salvation. The waters part for Israel and return over Egypt’s army.',
    orderIndex: 21,
    era: 'Exodus',
    category: 'Deliverance',
    period: 'Moses',
    dateLabel: 'c. 1446 BC',
    passages: [
      {
        book: 'Exodus',
        chapterStart: 14,
        verseStart: 1,
        chapterEnd: 15,
        verseEnd: 21,
        label: 'Exodus 14:1–15:21',
      },
    ],
  },
  {
    title: 'The Ten Commandments Given',
    slug: 'ten-commandments-given',
    summary:
      'God gives Israel His covenant law at Mount Sinai.',
    description:
      'At Mount Sinai, God gives Israel the Ten Commandments. These commands define covenant life and reveal God’s holiness and moral will.',
    orderIndex: 22,
    era: 'Wilderness',
    category: 'Law',
    period: 'Sinai',
    dateLabel: 'c. 1446 BC',
    passages: [
      {
        book: 'Exodus',
        chapterStart: 19,
        verseStart: 1,
        chapterEnd: 20,
        verseEnd: 21,
        label: 'Exodus 19:1–20:21',
      },
    ],
  },
  {
    title: 'The Golden Calf',
    slug: 'golden-calf',
    summary:
      'Israel breaks covenant by worshiping a golden calf.',
    description:
      'While Moses is on the mountain, Israel makes and worships a golden calf. The event reveals Israel’s spiritual weakness and need for mercy and intercession.',
    orderIndex: 23,
    era: 'Wilderness',
    category: 'Rebellion',
    period: 'Sinai',
    dateLabel: 'c. 1446 BC',
    passages: [
      {
        book: 'Exodus',
        chapterStart: 32,
        verseStart: 1,
        chapterEnd: 34,
        verseEnd: 35,
        label: 'Exodus 32:1–34:35',
      },
    ],
  },
  {
    title: 'The Tabernacle Completed',
    slug: 'tabernacle-completed',
    summary:
      'The tabernacle is completed, and God’s glory fills it.',
    description:
      'Israel builds the tabernacle according to God’s instructions. God’s presence fills the tabernacle, showing that He dwells among His people.',
    orderIndex: 24,
    era: 'Wilderness',
    category: 'Worship',
    period: 'Sinai',
    dateLabel: 'c. 1445 BC',
    passages: [
      {
        book: 'Exodus',
        chapterStart: 40,
        verseStart: 1,
        chapterEnd: 40,
        verseEnd: 38,
        label: 'Exodus 40:1–38',
      },
    ],
  },
  {
    title: 'Israel Refuses to Enter the Land',
    slug: 'israel-refuses-to-enter-the-land',
    summary:
      'Israel refuses to trust God and is sentenced to wander in the wilderness.',
    description:
      'After the spies report on the land, the people fear the inhabitants and refuse to enter. Their unbelief leads to forty years of wilderness wandering.',
    orderIndex: 25,
    era: 'Wilderness',
    category: 'Unbelief',
    period: 'Wilderness',
    dateLabel: 'c. 1445 BC',
    passages: [
      {
        book: 'Numbers',
        chapterStart: 13,
        verseStart: 1,
        chapterEnd: 14,
        verseEnd: 45,
        label: 'Numbers 13:1–14:45',
      },
    ],
  },
  {
    title: 'Moses Prepares Israel to Enter the Land',
    slug: 'moses-prepares-israel',
    summary:
      'Moses teaches the new generation before they enter the promised land.',
    description:
      'In Deuteronomy, Moses reminds Israel of God’s law, covenant faithfulness, and the choice between life and death as they prepare to enter Canaan.',
    orderIndex: 26,
    era: 'Wilderness',
    category: 'Covenant Renewal',
    period: 'Moab',
    dateLabel: 'c. 1406 BC',
    passages: [
      {
        book: 'Deuteronomy',
        chapterStart: 29,
        verseStart: 1,
        chapterEnd: 30,
        verseEnd: 20,
        label: 'Deuteronomy 29:1–30:20',
      },
    ],
  },
  {
    title: 'Joshua Leads Israel into the Promised Land',
    slug: 'joshua-enters-promised-land',
    summary:
      'Joshua leads Israel across the Jordan into Canaan.',
    description:
      'After Moses dies, Joshua leads Israel into the promised land. The crossing of the Jordan marks a new stage in God’s covenant promise.',
    orderIndex: 27,
    era: 'Conquest',
    category: 'Promised Land',
    period: 'Joshua',
    dateLabel: 'c. 1406 BC',
    passages: [
      {
        book: 'Joshua',
        chapterStart: 3,
        verseStart: 1,
        chapterEnd: 4,
        verseEnd: 24,
        label: 'Joshua 3:1–4:24',
      },
    ],
  },
  {
    title: 'The Fall of Jericho',
    slug: 'fall-of-jericho',
    summary:
      'God gives Jericho into Israel’s hands.',
    description:
      'Israel marches around Jericho according to God’s command, and the walls fall. The victory shows that the land is received by God’s power, not Israel’s strength.',
    orderIndex: 28,
    era: 'Conquest',
    category: 'Victory',
    period: 'Joshua',
    dateLabel: 'c. 1406 BC',
    passages: [
      {
        book: 'Joshua',
        chapterStart: 6,
        verseStart: 1,
        chapterEnd: 6,
        verseEnd: 27,
        label: 'Joshua 6:1–27',
      },
    ],
  },
  {
    title: 'The Period of the Judges Begins',
    slug: 'period-of-the-judges-begins',
    summary:
      'Israel enters a cycle of rebellion, oppression, crying out, and deliverance.',
    description:
      'After Joshua’s generation, Israel repeatedly turns away from God. The book of Judges shows the spiritual disorder of Israel before the monarchy.',
    orderIndex: 29,
    era: 'Judges',
    category: 'Cycle of Rebellion',
    period: 'Judges',
    dateLabel: 'c. 1350–1050 BC',
    passages: [
      {
        book: 'Judges',
        chapterStart: 2,
        verseStart: 6,
        chapterEnd: 3,
        verseEnd: 6,
        label: 'Judges 2:6–3:6',
      },
    ],
  },
  {
    title: 'Ruth and Boaz',
    slug: 'ruth-and-boaz',
    summary:
      'God preserves a family line through Ruth, Boaz, and redemption.',
    description:
      'During the days of the judges, Ruth shows covenant loyalty and is redeemed by Boaz. Their family line will lead to David and ultimately to Jesus.',
    orderIndex: 30,
    era: 'Judges',
    category: 'Redemption',
    period: 'Judges',
    dateLabel: 'During the judges',
    passages: [
      {
        book: 'Ruth',
        chapterStart: 1,
        verseStart: 1,
        chapterEnd: 4,
        verseEnd: 22,
        label: 'Ruth 1:1–4:22',
      },
    ],
  },
  {
    title: 'Samuel Is Called',
    slug: 'samuel-is-called',
    summary:
      'God calls Samuel as prophet during a spiritually dark time.',
    description:
      'Samuel hears the voice of the Lord as a child. He becomes a key prophet who will guide Israel from the period of judges into the monarchy.',
    orderIndex: 31,
    era: 'United Kingdom',
    category: 'Prophet',
    period: 'Samuel',
    dateLabel: 'c. 1100 BC',
    passages: [
      {
        book: '1 Samuel',
        chapterStart: 3,
        verseStart: 1,
        chapterEnd: 3,
        verseEnd: 21,
        label: '1 Samuel 3:1–21',
      },
    ],
  },
  {
    title: 'Israel Asks for a King',
    slug: 'israel-asks-for-king',
    summary:
      'Israel demands a king like the nations.',
    description:
      'Israel asks Samuel for a king. The request reveals a desire to be like surrounding nations, but God still works through the monarchy in His larger plan.',
    orderIndex: 32,
    era: 'United Kingdom',
    category: 'Monarchy',
    period: 'Samuel',
    dateLabel: 'c. 1050 BC',
    passages: [
      {
        book: '1 Samuel',
        chapterStart: 8,
        verseStart: 1,
        chapterEnd: 8,
        verseEnd: 22,
        label: '1 Samuel 8:1–22',
      },
    ],
  },
  {
    title: 'Saul Becomes King',
    slug: 'saul-becomes-king',
    summary:
      'Saul becomes Israel’s first king.',
    description:
      'Saul is chosen as Israel’s first king. His reign begins with promise but later reveals the danger of disobedience and pride.',
    orderIndex: 33,
    era: 'United Kingdom',
    category: 'Monarchy',
    period: 'Saul',
    dateLabel: 'c. 1050 BC',
    passages: [
      {
        book: '1 Samuel',
        chapterStart: 10,
        verseStart: 17,
        chapterEnd: 10,
        verseEnd: 27,
        label: '1 Samuel 10:17–27',
      },
    ],
  },
  {
    title: 'David Anointed King',
    slug: 'david-anointed-king',
    summary:
      'God chooses David, a shepherd, to become king.',
    description:
      'God sends Samuel to anoint David. Unlike human expectations, God looks at the heart and chooses David to lead His people.',
    orderIndex: 34,
    era: 'United Kingdom',
    category: 'Monarchy',
    period: 'David',
    dateLabel: 'c. 1025 BC',
    passages: [
      {
        book: '1 Samuel',
        chapterStart: 16,
        verseStart: 1,
        chapterEnd: 16,
        verseEnd: 13,
        label: '1 Samuel 16:1–13',
      },
    ],
  },
  {
    title: 'David and Goliath',
    slug: 'david-and-goliath',
    summary:
      'David defeats Goliath by trusting in the Lord.',
    description:
      'David faces Goliath not with confidence in weapons, but in the name of the Lord. The victory shows God’s power through faith and weakness.',
    orderIndex: 35,
    era: 'United Kingdom',
    category: 'Faith and Victory',
    period: 'David',
    dateLabel: 'c. 1020 BC',
    passages: [
      {
        book: '1 Samuel',
        chapterStart: 17,
        verseStart: 1,
        chapterEnd: 17,
        verseEnd: 58,
        label: '1 Samuel 17:1–58',
      },
    ],
  },
  {
    title: 'God’s Covenant with David',
    slug: 'covenant-with-david',
    summary:
      'God promises David a lasting kingdom and royal line.',
    description:
      'God promises David that his house and kingdom will endure. This covenant becomes central to the hope for the Messiah, the Son of David.',
    orderIndex: 36,
    era: 'United Kingdom',
    category: 'Covenant',
    period: 'David',
    dateLabel: 'c. 1000 BC',
    passages: [
      {
        book: '2 Samuel',
        chapterStart: 7,
        verseStart: 1,
        chapterEnd: 7,
        verseEnd: 29,
        label: '2 Samuel 7:1–29',
      },
    ],
  },
  {
    title: 'Solomon Builds the Temple',
    slug: 'solomon-builds-temple',
    summary:
      'Solomon builds the temple in Jerusalem.',
    description:
      'Solomon builds the temple as the central place of worship for Israel. When it is dedicated, the glory of the Lord fills the temple.',
    orderIndex: 37,
    era: 'United Kingdom',
    category: 'Temple',
    period: 'Solomon',
    dateLabel: 'c. 966–959 BC',
    passages: [
      {
        book: '1 Kings',
        chapterStart: 6,
        verseStart: 1,
        chapterEnd: 8,
        verseEnd: 66,
        label: '1 Kings 6:1–8:66',
      },
    ],
  },
  {
    title: 'The Kingdom Divides',
    slug: 'kingdom-divides',
    summary:
      'Israel divides into northern and southern kingdoms.',
    description:
      'After Solomon, the kingdom splits. The northern kingdom is called Israel, and the southern kingdom is called Judah.',
    orderIndex: 38,
    era: 'Divided Kingdom',
    category: 'Kingdom Division',
    period: 'Rehoboam and Jeroboam',
    dateLabel: 'c. 930 BC',
    passages: [
      {
        book: '1 Kings',
        chapterStart: 12,
        verseStart: 1,
        chapterEnd: 12,
        verseEnd: 24,
        label: '1 Kings 12:1–24',
      },
    ],
  },
  {
    title: 'Elijah on Mount Carmel',
    slug: 'elijah-on-mount-carmel',
    summary:
      'God shows He alone is God before Israel and the prophets of Baal.',
    description:
      'Elijah confronts the prophets of Baal on Mount Carmel. God answers by fire, calling Israel back from idolatry.',
    orderIndex: 39,
    era: 'Divided Kingdom',
    category: 'Prophets',
    period: 'Elijah',
    dateLabel: 'c. 870 BC',
    passages: [
      {
        book: '1 Kings',
        chapterStart: 18,
        verseStart: 20,
        chapterEnd: 18,
        verseEnd: 46,
        label: '1 Kings 18:20–46',
      },
    ],
  },
  {
    title: 'Northern Kingdom Falls to Assyria',
    slug: 'northern-kingdom-falls',
    summary:
      'Assyria conquers the northern kingdom of Israel.',
    description:
      'Because of persistent idolatry and covenant unfaithfulness, the northern kingdom falls to Assyria and many are taken into exile.',
    orderIndex: 40,
    era: 'Exile',
    category: 'Judgment',
    period: 'Assyrian Exile',
    dateLabel: '722 BC',
    passages: [
      {
        book: '2 Kings',
        chapterStart: 17,
        verseStart: 1,
        chapterEnd: 17,
        verseEnd: 23,
        label: '2 Kings 17:1–23',
      },
    ],
  },
  {
    title: 'Jerusalem Falls to Babylon',
    slug: 'jerusalem-falls-to-babylon',
    summary:
      'Babylon destroys Jerusalem and the temple.',
    description:
      'Judah falls to Babylon after repeated rebellion and rejection of the prophets. Jerusalem is destroyed, the temple is burned, and many are taken into exile.',
    orderIndex: 41,
    era: 'Exile',
    category: 'Judgment',
    period: 'Babylonian Exile',
    dateLabel: '586 BC',
    passages: [
      {
        book: '2 Kings',
        chapterStart: 25,
        verseStart: 1,
        chapterEnd: 25,
        verseEnd: 21,
        label: '2 Kings 25:1–21',
      },
    ],
  },
  {
    title: 'Daniel in Babylon',
    slug: 'daniel-in-babylon',
    summary:
      'Daniel remains faithful to God while living in exile.',
    description:
      'Daniel and his friends live in Babylon under foreign rule. Their faithfulness shows that God remains sovereign even when His people are in exile.',
    orderIndex: 42,
    era: 'Exile',
    category: 'Faithfulness',
    period: 'Babylonian Exile',
    dateLabel: '6th century BC',
    passages: [
      {
        book: 'Daniel',
        chapterStart: 1,
        verseStart: 1,
        chapterEnd: 1,
        verseEnd: 21,
        label: 'Daniel 1:1–21',
      },
      {
        book: 'Daniel',
        chapterStart: 6,
        verseStart: 1,
        chapterEnd: 6,
        verseEnd: 28,
        label: 'Daniel 6:1–28',
      },
    ],
  },
  {
    title: 'Return from Exile',
    slug: 'return-from-exile',
    summary:
      'God brings His people back from Babylonian exile.',
    description:
      'Persia allows Jewish exiles to return to Jerusalem. The return shows God’s faithfulness to His promises even after judgment.',
    orderIndex: 43,
    era: 'Return',
    category: 'Restoration',
    period: 'Persian Period',
    dateLabel: '538 BC and after',
    passages: [
      {
        book: 'Ezra',
        chapterStart: 1,
        verseStart: 1,
        chapterEnd: 1,
        verseEnd: 11,
        label: 'Ezra 1:1–11',
      },
    ],
  },
  {
    title: 'The Temple Rebuilt',
    slug: 'temple-rebuilt',
    summary:
      'The returned exiles rebuild the temple in Jerusalem.',
    description:
      'After opposition and delay, the temple is completed. Worship is restored, though Israel still waits for the fullness of God’s promises.',
    orderIndex: 44,
    era: 'Return',
    category: 'Temple',
    period: 'Persian Period',
    dateLabel: '516 BC',
    passages: [
      {
        book: 'Ezra',
        chapterStart: 6,
        verseStart: 13,
        chapterEnd: 6,
        verseEnd: 22,
        label: 'Ezra 6:13–22',
      },
    ],
  },
  {
    title: 'Nehemiah Rebuilds Jerusalem’s Wall',
    slug: 'nehemiah-rebuilds-wall',
    summary:
      'Nehemiah leads the rebuilding of Jerusalem’s wall.',
    description:
      'Nehemiah receives permission to return and rebuild Jerusalem’s walls. The restored walls represent protection, identity, and renewed hope after exile.',
    orderIndex: 45,
    era: 'Return',
    category: 'Restoration',
    period: 'Persian Period',
    dateLabel: 'c. 445 BC',
    passages: [
      {
        book: 'Nehemiah',
        chapterStart: 1,
        verseStart: 1,
        chapterEnd: 2,
        verseEnd: 20,
        label: 'Nehemiah 1:1–2:20',
      },
      {
        book: 'Nehemiah',
        chapterStart: 6,
        verseStart: 15,
        chapterEnd: 6,
        verseEnd: 16,
        label: 'Nehemiah 6:15–16',
      },
    ],
  },
  {
    title: 'The Birth of Jesus',
    slug: 'birth-of-jesus',
    summary:
      'Jesus the Messiah is born in Bethlehem.',
    description:
      'The long-awaited Messiah is born. Jesus’ birth fulfills promises connected to Abraham, David, and the hope of salvation for all nations.',
    orderIndex: 46,
    era: 'Jesus',
    category: 'Incarnation',
    period: 'Gospels',
    dateLabel: 'c. 6–4 BC',
    passages: [
      {
        book: 'Matthew',
        chapterStart: 1,
        verseStart: 18,
        chapterEnd: 2,
        verseEnd: 12,
        label: 'Matthew 1:18–2:12',
      },
      {
        book: 'Luke',
        chapterStart: 2,
        verseStart: 1,
        chapterEnd: 2,
        verseEnd: 20,
        label: 'Luke 2:1–20',
      },
    ],
  },
  {
    title: 'Jesus Is Baptized',
    slug: 'jesus-is-baptized',
    summary:
      'Jesus is baptized, and the Father declares Him His beloved Son.',
    description:
      'Jesus begins His public ministry through baptism. The Spirit descends, and the Father identifies Jesus as His beloved Son.',
    orderIndex: 47,
    era: 'Jesus',
    category: 'Ministry',
    period: 'Gospels',
    dateLabel: 'c. AD 27–29',
    passages: [
      {
        book: 'Matthew',
        chapterStart: 3,
        verseStart: 13,
        chapterEnd: 3,
        verseEnd: 17,
        label: 'Matthew 3:13–17',
      },
      {
        book: 'Mark',
        chapterStart: 1,
        verseStart: 9,
        chapterEnd: 1,
        verseEnd: 11,
        label: 'Mark 1:9–11',
      },
      {
        book: 'Luke',
        chapterStart: 3,
        verseStart: 21,
        chapterEnd: 3,
        verseEnd: 22,
        label: 'Luke 3:21–22',
      },
    ],
  },
  {
    title: 'Jesus Tempted in the Wilderness',
    slug: 'jesus-tempted-in-wilderness',
    summary:
      'Jesus resists temptation and remains faithful where Israel failed.',
    description:
      'After His baptism, Jesus is tempted in the wilderness. He answers Satan with Scripture and remains obedient to the Father.',
    orderIndex: 48,
    era: 'Jesus',
    category: 'Obedience',
    period: 'Gospels',
    dateLabel: 'c. AD 27–29',
    passages: [
      {
        book: 'Matthew',
        chapterStart: 4,
        verseStart: 1,
        chapterEnd: 4,
        verseEnd: 11,
        label: 'Matthew 4:1–11',
      },
      {
        book: 'Luke',
        chapterStart: 4,
        verseStart: 1,
        chapterEnd: 4,
        verseEnd: 13,
        label: 'Luke 4:1–13',
      },
    ],
  },
  {
    title: 'Jesus Announces the Kingdom',
    slug: 'jesus-announces-kingdom',
    summary:
      'Jesus proclaims the good news of the kingdom of God.',
    description:
      'Jesus begins preaching that the kingdom of God is near. His teaching, healing, and authority reveal the arrival of God’s reign.',
    orderIndex: 49,
    era: 'Jesus',
    category: 'Kingdom',
    period: 'Gospels',
    dateLabel: 'c. AD 27–30',
    passages: [
      {
        book: 'Mark',
        chapterStart: 1,
        verseStart: 14,
        chapterEnd: 1,
        verseEnd: 15,
        label: 'Mark 1:14–15',
      },
      {
        book: 'Matthew',
        chapterStart: 4,
        verseStart: 17,
        chapterEnd: 4,
        verseEnd: 25,
        label: 'Matthew 4:17–25',
      },
    ],
  },
  {
    title: 'The Sermon on the Mount',
    slug: 'sermon-on-the-mount',
    summary:
      'Jesus teaches what life in God’s kingdom looks like.',
    description:
      'Jesus teaches His disciples about righteousness, mercy, prayer, trust, and obedience. The Sermon on the Mount shows the character of kingdom life.',
    orderIndex: 50,
    era: 'Jesus',
    category: 'Teaching',
    period: 'Gospels',
    dateLabel: 'c. AD 28–30',
    passages: [
      {
        book: 'Matthew',
        chapterStart: 5,
        verseStart: 1,
        chapterEnd: 7,
        verseEnd: 29,
        label: 'Matthew 5:1–7:29',
      },
    ],
  },
  {
    title: 'Jesus Raises Lazarus',
    slug: 'jesus-raises-lazarus',
    summary:
      'Jesus raises Lazarus from the dead and reveals Himself as the resurrection and the life.',
    description:
      'Jesus comes to Bethany after Lazarus dies. By raising him, Jesus reveals His power over death and points forward to His own resurrection.',
    orderIndex: 51,
    era: 'Jesus',
    category: 'Signs',
    period: 'Gospels',
    dateLabel: 'c. AD 30',
    passages: [
      {
        book: 'John',
        chapterStart: 11,
        verseStart: 1,
        chapterEnd: 11,
        verseEnd: 44,
        label: 'John 11:1–44',
      },
    ],
  },
  {
    title: 'The Triumphal Entry',
    slug: 'triumphal-entry',
    summary:
      'Jesus enters Jerusalem as King.',
    description:
      'Jesus enters Jerusalem riding on a donkey while crowds praise Him. The event announces His kingship while moving toward the cross.',
    orderIndex: 52,
    era: 'Jesus',
    category: 'Passion Week',
    period: 'Gospels',
    dateLabel: 'c. AD 30',
    passages: [
      {
        book: 'Matthew',
        chapterStart: 21,
        verseStart: 1,
        chapterEnd: 21,
        verseEnd: 11,
        label: 'Matthew 21:1–11',
      },
      {
        book: 'John',
        chapterStart: 12,
        verseStart: 12,
        chapterEnd: 12,
        verseEnd: 19,
        label: 'John 12:12–19',
      },
    ],
  },
  {
    title: 'The Last Supper',
    slug: 'last-supper',
    summary:
      'Jesus shares the Passover meal and institutes the Lord’s Supper.',
    description:
      'On the night before His death, Jesus shares a final meal with His disciples. He gives bread and cup as signs of His body and blood.',
    orderIndex: 53,
    era: 'Jesus',
    category: 'Passion Week',
    period: 'Gospels',
    dateLabel: 'c. AD 30',
    passages: [
      {
        book: 'Matthew',
        chapterStart: 26,
        verseStart: 17,
        chapterEnd: 26,
        verseEnd: 30,
        label: 'Matthew 26:17–30',
      },
      {
        book: 'Luke',
        chapterStart: 22,
        verseStart: 7,
        chapterEnd: 22,
        verseEnd: 23,
        label: 'Luke 22:7–23',
      },
    ],
  },
  {
    title: 'The Crucifixion',
    slug: 'crucifixion',
    summary:
      'Jesus is crucified, bearing sin and opening the way to forgiveness.',
    description:
      'Jesus is condemned, mocked, crucified, and dies. The cross stands at the center of the biblical story as the place where sin is judged and salvation is accomplished.',
    orderIndex: 54,
    era: 'Jesus',
    category: 'Cross',
    period: 'Gospels',
    dateLabel: 'c. AD 30',
    passages: [
      {
        book: 'Matthew',
        chapterStart: 27,
        verseStart: 27,
        chapterEnd: 27,
        verseEnd: 56,
        label: 'Matthew 27:27–56',
      },
      {
        book: 'Mark',
        chapterStart: 15,
        verseStart: 16,
        chapterEnd: 15,
        verseEnd: 41,
        label: 'Mark 15:16–41',
      },
      {
        book: 'Luke',
        chapterStart: 23,
        verseStart: 26,
        chapterEnd: 23,
        verseEnd: 49,
        label: 'Luke 23:26–49',
      },
      {
        book: 'John',
        chapterStart: 19,
        verseStart: 16,
        chapterEnd: 19,
        verseEnd: 37,
        label: 'John 19:16–37',
      },
    ],
  },
  {
    title: 'The Resurrection',
    slug: 'resurrection',
    summary:
      'Jesus rises from the dead, defeating sin and death.',
    description:
      'On the first day of the week, Jesus’ tomb is found empty. His resurrection confirms His identity and launches the hope of new creation.',
    orderIndex: 55,
    era: 'Jesus',
    category: 'Resurrection',
    period: 'Gospels',
    dateLabel: 'c. AD 30',
    passages: [
      {
        book: 'Matthew',
        chapterStart: 28,
        verseStart: 1,
        chapterEnd: 28,
        verseEnd: 10,
        label: 'Matthew 28:1–10',
      },
      {
        book: 'Luke',
        chapterStart: 24,
        verseStart: 1,
        chapterEnd: 24,
        verseEnd: 12,
        label: 'Luke 24:1–12',
      },
      {
        book: 'John',
        chapterStart: 20,
        verseStart: 1,
        chapterEnd: 20,
        verseEnd: 18,
        label: 'John 20:1–18',
      },
    ],
  },
  {
    title: 'The Great Commission',
    slug: 'great-commission',
    summary:
      'Jesus sends His followers to make disciples of all nations.',
    description:
      'The risen Jesus commands His disciples to make disciples, baptize, and teach. The mission moves outward from Israel to all nations.',
    orderIndex: 56,
    era: 'Jesus',
    category: 'Mission',
    period: 'Gospels',
    dateLabel: 'c. AD 30',
    passages: [
      {
        book: 'Matthew',
        chapterStart: 28,
        verseStart: 16,
        chapterEnd: 28,
        verseEnd: 20,
        label: 'Matthew 28:16–20',
      },
    ],
  },
  {
    title: 'The Ascension',
    slug: 'ascension',
    summary:
      'Jesus ascends to heaven and promises the Holy Spirit.',
    description:
      'Jesus is taken up into heaven before His disciples. They are told to wait for power from the Holy Spirit and to be witnesses to the ends of the earth.',
    orderIndex: 57,
    era: 'Early Church',
    category: 'Ascension',
    period: 'Acts',
    dateLabel: 'c. AD 30',
    passages: [
      {
        book: 'Acts',
        chapterStart: 1,
        verseStart: 1,
        chapterEnd: 1,
        verseEnd: 11,
        label: 'Acts 1:1–11',
      },
    ],
  },
  {
    title: 'Pentecost',
    slug: 'pentecost',
    summary:
      'The Holy Spirit is poured out, and the church begins its public witness.',
    description:
      'At Pentecost, the Holy Spirit fills the believers. Peter preaches, many believe, and the church begins to grow in Jerusalem.',
    orderIndex: 58,
    era: 'Early Church',
    category: 'Holy Spirit',
    period: 'Acts',
    dateLabel: 'c. AD 30',
    passages: [
      {
        book: 'Acts',
        chapterStart: 2,
        verseStart: 1,
        chapterEnd: 2,
        verseEnd: 47,
        label: 'Acts 2:1–47',
      },
    ],
  },
  {
    title: 'Stephen Is Martyred',
    slug: 'stephen-martyred',
    summary:
      'Stephen becomes the first Christian martyr, and persecution spreads the church.',
    description:
      'Stephen boldly testifies before the council and is killed. His death marks a turning point as persecution scatters believers beyond Jerusalem.',
    orderIndex: 59,
    era: 'Early Church',
    category: 'Persecution',
    period: 'Acts',
    dateLabel: 'c. AD 30s',
    passages: [
      {
        book: 'Acts',
        chapterStart: 6,
        verseStart: 8,
        chapterEnd: 7,
        verseEnd: 60,
        label: 'Acts 6:8–7:60',
      },
    ],
  },
  {
    title: 'Saul Encounters Jesus',
    slug: 'saul-encounters-jesus',
    summary:
      'Saul the persecutor is confronted by the risen Jesus.',
    description:
      'Saul is traveling to persecute believers when the risen Jesus appears to him. His conversion becomes one of the major turning points in the spread of the gospel.',
    orderIndex: 60,
    era: 'Early Church',
    category: 'Conversion',
    period: 'Acts',
    dateLabel: 'c. AD 30s',
    passages: [
      {
        book: 'Acts',
        chapterStart: 9,
        verseStart: 1,
        chapterEnd: 9,
        verseEnd: 31,
        label: 'Acts 9:1–31',
      },
    ],
  },
  {
    title: 'Peter and Cornelius',
    slug: 'peter-and-cornelius',
    summary:
      'God shows that the gospel is for Gentiles as well as Jews.',
    description:
      'Peter is sent to Cornelius, a Gentile. The Holy Spirit falls on Gentile believers, showing that God welcomes people from all nations through Jesus.',
    orderIndex: 61,
    era: 'Early Church',
    category: 'Gentile Mission',
    period: 'Acts',
    dateLabel: 'c. AD 30s–40s',
    passages: [
      {
        book: 'Acts',
        chapterStart: 10,
        verseStart: 1,
        chapterEnd: 11,
        verseEnd: 18,
        label: 'Acts 10:1–11:18',
      },
    ],
  },
  {
    title: 'Paul’s Missionary Journeys Begin',
    slug: 'paul-missionary-journeys-begin',
    summary:
      'Paul and Barnabas are sent to preach the gospel beyond Antioch.',
    description:
      'The church in Antioch sends Paul and Barnabas. The gospel begins spreading more widely across Gentile regions through missionary journeys.',
    orderIndex: 62,
    era: 'Early Church',
    category: 'Mission',
    period: 'Acts',
    dateLabel: 'c. AD 46–48',
    passages: [
      {
        book: 'Acts',
        chapterStart: 13,
        verseStart: 1,
        chapterEnd: 14,
        verseEnd: 28,
        label: 'Acts 13:1–14:28',
      },
    ],
  },
  {
    title: 'The Jerusalem Council',
    slug: 'jerusalem-council',
    summary:
      'The early church clarifies that Gentile believers are saved by grace.',
    description:
      'Church leaders gather in Jerusalem to address whether Gentile believers must keep the law of Moses. The council affirms salvation by grace and unity in the gospel.',
    orderIndex: 63,
    era: 'Early Church',
    category: 'Church Unity',
    period: 'Acts',
    dateLabel: 'c. AD 49',
    passages: [
      {
        book: 'Acts',
        chapterStart: 15,
        verseStart: 1,
        chapterEnd: 15,
        verseEnd: 35,
        label: 'Acts 15:1–35',
      },
    ],
  },
  {
    title: 'Paul Imprisoned and Sent to Rome',
    slug: 'paul-sent-to-rome',
    summary:
      'Paul is imprisoned and eventually taken to Rome to testify.',
    description:
      'Paul is arrested, gives testimony before rulers, and appeals to Caesar. Even imprisonment becomes a way for the gospel to move toward Rome.',
    orderIndex: 64,
    era: 'Early Church',
    category: 'Witness',
    period: 'Acts',
    dateLabel: 'c. AD 57–62',
    passages: [
      {
        book: 'Acts',
        chapterStart: 21,
        verseStart: 27,
        chapterEnd: 28,
        verseEnd: 31,
        label: 'Acts 21:27–28:31',
      },
    ],
  },
]


const timelineEras = [
  {
    title: 'Beginnings',
    slug: 'beginnings',
    summary: 'Creation, fall, flood, and the scattering of nations.',
    orderIndex: 1,
    dateLabel: 'Before Abraham',
    imageUrl: '/events/beginnings.webp',
  },
  {
    title: 'Patriarchs',
    slug: 'patriarchs',
    summary: 'Abraham, Isaac, Jacob, Joseph, and the covenant family.',
    orderIndex: 2,
    dateLabel: 'c. 2000–1800 BC',
    imageUrl: '/events/patriarchs.webp',
  },
  {
    title: 'Exodus',
    slug: 'exodus',
    summary: 'Israel’s deliverance from Egypt through Moses.',
    orderIndex: 3,
    dateLabel: 'c. 1446 BC',
    imageUrl: '/events/exodus.webp',
  },
  {
    title: 'Wilderness',
    slug: 'wilderness',
    summary: 'Sinai, covenant law, tabernacle, rebellion, and wandering.',
    orderIndex: 4,
    dateLabel: 'c. 1446–1406 BC',
    imageUrl: '/events/wilderness.webp',
  },
  {
    title: 'Conquest',
    slug: 'conquest',
    summary: 'Joshua leads Israel into the promised land.',
    orderIndex: 5,
    dateLabel: 'c. 1406 BC',
    imageUrl: '/events/conquest.webp',
  },
  {
    title: 'Judges',
    slug: 'judges',
    summary: 'Israel’s cycle of rebellion, oppression, and deliverance.',
    orderIndex: 6,
    dateLabel: 'c. 1350–1050 BC',
    imageUrl: '/events/judges.webp',
  },
  {
    title: 'United Kingdom',
    slug: 'united-kingdom',
    summary: 'Samuel, Saul, David, Solomon, and the temple.',
    orderIndex: 7,
    dateLabel: 'c. 1050–930 BC',
    imageUrl: '/events/united-kingdom.webp',
  },
  {
    title: 'Divided Kingdom',
    slug: 'divided-kingdom',
    summary: 'Israel and Judah divide, and the prophets call God’s people back.',
    orderIndex: 8,
    dateLabel: 'c. 930–722 BC',
    imageUrl: '/events/divided-kingdom.webp',
  },
  {
    title: 'Exile',
    slug: 'exile',
    summary: 'Assyria and Babylon bring judgment, exile, and loss.',
    orderIndex: 9,
    dateLabel: '722–586 BC',
    imageUrl: '/events/exile.webp',
  },
  {
    title: 'Return',
    slug: 'return',
    summary: 'God brings His people back to rebuild Jerusalem and the temple.',
    orderIndex: 10,
    dateLabel: '538–445 BC',
    imageUrl: '/events/return.webp',
  },
  {
    title: 'Jesus',
    slug: 'jesus',
    summary: 'The Messiah comes, teaches, dies, rises, and sends His followers.',
    orderIndex: 11,
    dateLabel: 'c. 6 BC–AD 30',
    imageUrl: '/events/jesus.webp',
  },
  {
    title: 'Early Church',
    slug: 'early-church',
    summary: 'The Holy Spirit empowers the church and the gospel spreads.',
    orderIndex: 12,
    dateLabel: 'c. AD 30–62',
    imageUrl: '/events/early-church.webp',
  },
]
async function main() {
  await prisma.bibleEventPassage.deleteMany()
  await prisma.bibleEvent.deleteMany()
  await prisma.bibleEra.deleteMany()

  const eraMap = {}

  for (const era of timelineEras) {
    const createdEra = await prisma.bibleEra.create({
      data: {
        title: era.title,
        slug: era.slug,
        summary: era.summary,
        description: era.description,
        orderIndex: era.orderIndex,
        dateLabel: era.dateLabel,
        startYear: era.startYear,
        endYear: era.endYear,
        imageUrl: era.imageUrl,
        status: 'PUBLISHED',
      },
    })

    eraMap[era.title] = createdEra.id
  }

  for (const event of timelineEvents) {
    const eraId = eraMap[event.era]

    if (!eraId) {
      throw new Error(`Missing BibleEra for event "${event.title}" with era "${event.era}"`)
    }

    await prisma.bibleEvent.create({
      data: {
        title: event.title,
        slug: event.slug,
        summary: event.summary,
        description: event.description,
        orderIndex: event.orderIndex,
        era: event.era,
        eraRef: {
          connect: { id: eraId },
        },
        category: event.category,
        period: event.period,
        dateLabel: event.dateLabel,
        source: 'seed',
        status: 'published',
        passages: {
          create: event.passages,
        },
      },
    })
  }

  console.log(`Created ${timelineEras.length} Bible eras`)
  console.log(`Created ${timelineEvents.length} Bible timeline events`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })