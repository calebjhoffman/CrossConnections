import { useState } from 'react'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { useAuth } from '@/context/AuthContext'
import { rawFetch } from '@/utils/fetcher'
import { emitFlash } from '@/utils/flashBus'
import Collapse from '@mui/material/Collapse'

const MAX_COMMENT_LENGTH = 2000
const COMMENT_PREVIEW_LENGTH = 220

export default function VerseContextDrawer({
  open,
  onClose,
  reference,
  topics = [],
  selectedVerse,
  comments = [],
  commentsLoading = false,
  setComments,
}) {
  const { user, accessToken } = useAuth()

  const [commentBody, setCommentBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingBody, setEditingBody] = useState('')
  const [expandedCommentIds, setExpandedCommentIds] = useState({})
  const [commentFormOpen, setCommentFormOpen] = useState(false)


  function toggleExpandedComment(commentId) {
    setExpandedCommentIds((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }


  async function createComment() {
    if (!selectedVerse || !commentBody.trim()) return

    if (commentBody.length > MAX_COMMENT_LENGTH) {
      emitFlash({
        message: `Comment must be ${MAX_COMMENT_LENGTH} characters or less.`,
        severity: 'warning',
      })
      return
    }

    setSubmitting(true)

    try {
      const data = await rawFetch(
        `/verse-comments/${selectedVerse.id}`,
        {
          method: 'POST',
          body: JSON.stringify({ body: commentBody }),
        },
        accessToken
      )

      setComments((prev) => [...prev, data.comment])
      setCommentBody('')
    } catch (err) {
      console.error('Could not create comment:', err)
    } finally {
      setSubmitting(false)
      setCommentBody('')
      setCommentFormOpen(false)
    }
  }

  function startEditing(comment) {
    setEditingCommentId(comment.id)
    setEditingBody(comment.body)
  }

  function cancelEditing() {
    setEditingCommentId(null)
    setEditingBody('')
  }

  async function updateComment(commentId) {
    if (!editingBody.trim()) return

    if (editingBody.length > MAX_COMMENT_LENGTH) {
      emitFlash({
        message: `Comment must be ${MAX_COMMENT_LENGTH} characters or less.`,
        severity: 'warning',
      })
      return
    }

    try {
      const data = await rawFetch(
        `/verse-comments/${commentId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ body: editingBody }),
        },
        accessToken
      )

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? data.comment : comment
        )
      )

      cancelEditing()
    } catch (err) {
      console.error('Could not update comment:', err)
    }
  }

  async function deleteComment(commentId) {
    const previousComments = comments

    setComments((prev) =>
      prev.filter((comment) => comment.id !== commentId)
    )

    try {
      await rawFetch(
        `/verse-comments/${commentId}`,
        {
          method: 'DELETE',
        },
        accessToken
      )
    } catch (err) {
      console.error('Could not delete comment:', err)
      setComments(previousComments)
    }
  }

  function getDisplayName(commentUser) {
    if (commentUser?.firstName || commentUser?.lastName) {
      return `${commentUser.firstName || ''} ${commentUser.lastName || ''}`.trim()
    }

    return commentUser?.email || 'User'
  }

  function isCommentOwner(comment) {
    return user?.id === comment.userId || user?.userId === comment.userId
  }

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      slotProps={{
        transition: {
          timeout: {
            enter: 420,
            exit: 240,
          },
          easing: {
            enter: 'cubic-bezier(0.22, 1, 0.36, 1)',
            exit: 'cubic-bezier(0.4, 0, 1, 1)',
          },
        },
        paper: {
          sx: {
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            maxHeight: '82vh',
            overflow: 'hidden',
          },
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 720,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '82vh',
        }}
      >
        <Box
          sx={{
            px: 2.5,
            pt: 1.5,
            pb: 1,
            position: 'sticky',
            top: 0,
            bgcolor: 'background.paper',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 5,
              borderRadius: 999,
              bgcolor: 'divider',
              mx: 'auto',
              mb: 2,
            }}
          />

          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: 'text.secondary',
                  letterSpacing: 1,
                  lineHeight: 1,
                }}
              >
                Verse Context
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mt: 0.5,
                }}
              >
                {reference}
              </Typography>
            </Box>

            <IconButton onClick={onClose} aria-label="Close context drawer">
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>

        <Divider />

        <Box
          sx={{
            px: 2.5,
            py: 2.5,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <Stack spacing={3}>
            <Box>
              {topics.length === 0 ? (
                <Box
                  sx={{
                    py: 3,
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  <InfoOutlinedIcon sx={{ fontSize: 34, mb: 1 }} />

                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    No context added yet
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 0.75 }}>
                    This verse is ready for future notes, definitions, and references.
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2}>
                  {topics.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'background.default',
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          alignItems: 'center',
                          mb: 1,
                        }}
                      >
                        <MenuBookIcon color="primary" fontSize="small" />

                        <Chip
                          label={item.type || 'Context'}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ fontWeight: 600 }}
                        />
                      </Stack>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          mb: 1,
                          lineHeight: 1.25,
                        }}
                      >
                        {item.title}
                      </Typography>

                      {item.summary && (
                        <Typography
                          variant="body1"
                          sx={{
                            lineHeight: 1.75,
                            color: 'text.primary',
                          }}
                        >
                          {item.summary}
                        </Typography>
                      )}

                      {item.note && (
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1.5,
                            lineHeight: 1.7,
                            color: 'text.secondary',
                          }}
                        >
                          {item.note}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>

            <Divider />

            <Stack spacing={2}>
              <Box>
                <Typography variant="h6" fontWeight={800}>
                  Comments
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Add your own context to this verse.
                </Typography>
              </Box>

              <Stack spacing={1}>
                {!commentFormOpen && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setCommentFormOpen(true)}
                    sx={{
                      alignSelf: 'flex-start',
                    }}
                  >
                    Add Comment
                  </Button>
                )}

                <Collapse
                  in={commentFormOpen}
                  timeout={{
                    enter: 360,
                    exit: 240,
                  }}
                  easing={{
                    enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    exit: 'cubic-bezier(0.4, 0, 1, 1)',
                  }}
                  unmountOnExit
                >
                  <Stack 
                    spacing={1}  
                    sx={{
                      pt: 1,
                      transition:
                        'opacity 260ms ease, transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
                      opacity: commentFormOpen ? 1 : 0,
                      transform: commentFormOpen ? 'translateY(0)' : 'translateY(-6px)',
                    }}>
                    <TextField
                      value={commentBody}
                      onChange={(event) => setCommentBody(event.target.value)}
                      placeholder="Write a comment..."
                      multiline
                      minRows={2}
                      fullWidth
                      slotProps={{
                        htmlInput: {
                          maxLength: MAX_COMMENT_LENGTH,
                        },
                      }}
                    />

                    <Typography
                      variant="caption"
                      color={
                        commentBody.length >= MAX_COMMENT_LENGTH
                          ? 'warning.main'
                          : 'text.secondary'
                      }
                      sx={{
                        alignSelf: 'flex-end',
                      }}
                    >
                      {commentBody.length}/{MAX_COMMENT_LENGTH}
                    </Typography>

                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: 'flex-end',
                        gap: 1,
                      }}
                    >
                      <Button
                        size="small"
                        onClick={() => {
                          setCommentBody('')
                          setCommentFormOpen(false)
                        }}
                      >
                        Cancel
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        disabled={submitting || !commentBody.trim()}
                        onClick={createComment}
                      >
                        Add
                      </Button>
                    </Stack>
                  </Stack>
                </Collapse>
              </Stack>

              {commentsLoading ? (
                <Box>
                  <CircularProgress size={22} />
                </Box>
              ) : comments.length === 0 ? (
                <Typography color="text.secondary">
                  No comments yet.
                </Typography>
              ) : (
                <Box
                  sx={{
                    maxHeight: 320,
                    overflowY: 'auto',
                    pr: 0.5,
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  <Stack spacing={1.5}>
                    {comments.map((comment) => {
                    const owner = isCommentOwner(comment)
                    const isEditing = editingCommentId === comment.id

                    return (
                      <Box
                        key={comment.id}
                        sx={{
                          p: 1.75,
                          borderLeft: '4px solid',
                          borderColor: owner ? 'primary.main' : 'divider',
                          bgcolor: 'background.default',
                        }}
                      >
                        <Stack spacing={1}>
                          <Stack
                            direction="row"
                            sx={{
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: 1,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              fontWeight={800}
                              color={owner ? 'primary' : 'text.primary'}
                            >
                              {getDisplayName(comment.user)}
                            </Typography>

                            {owner && (
                              <Stack direction="row" spacing={0.5}>
                                <IconButton
                                  size="small"
                                  onClick={() => startEditing(comment)}
                                  aria-label="Edit comment"
                                >
                                  <EditOutlinedIcon fontSize="small" />
                                </IconButton>

                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => deleteComment(comment.id)}
                                  aria-label="Delete comment"
                                >
                                  <DeleteOutlineOutlinedIcon fontSize="small" />
                                </IconButton>
                              </Stack>
                            )}
                          </Stack>

                          {isEditing ? (
                            <Stack spacing={1}>
                              <TextField
                                value={editingBody}
                                onChange={(event) => setEditingBody(event.target.value)}
                                multiline
                                minRows={2}
                                fullWidth
                                inputProps={{
                                  maxLength: MAX_COMMENT_LENGTH,
                                }}
                              />

                              <Typography
                                variant="caption"
                                color={
                                  editingBody.length >= MAX_COMMENT_LENGTH
                                    ? 'warning.main'
                                    : 'text.secondary'
                                }
                                sx={{
                                  alignSelf: 'flex-end',
                                }}
                              >
                                {editingBody.length}/{MAX_COMMENT_LENGTH}
                              </Typography>

                              <Stack
                                direction="row"
                                sx={{
                                  justifyContent: 'flex-end',
                                  gap: 1,
                                }}
                              >
                                <Button size="small" onClick={cancelEditing}>
                                  Cancel
                                </Button>

                                <Button
                                  size="small"
                                  variant="contained"
                                  disabled={!editingBody.trim()}
                                  onClick={() => updateComment(comment.id)}
                                >
                                  Save
                                </Button>
                              </Stack>
                            </Stack>
                          ) : (
                          <Box>
                            <Typography
                              sx={{
                                lineHeight: 1.7,
                                display: '-webkit-box',
                                WebkitLineClamp: expandedCommentIds[comment.id] ? 'unset' : 4,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {comment.body}
                            </Typography>

                            {comment.body.length > COMMENT_PREVIEW_LENGTH && (
                              <Button
                                size="small"
                                onClick={() => toggleExpandedComment(comment.id)}
                                sx={{
                                  mt: 0.5,
                                  px: 0,
                                  minWidth: 0,
                                  textTransform: 'none',
                                }}
                              >
                                {expandedCommentIds[comment.id] ? 'Show less' : '...more'}
                              </Button>
                            )}
                          </Box>
                          )}
                        </Stack>
                      </Box>
                    )
                  })}
                </Stack>
                </Box>
              )}
            </Stack>
            
          </Stack>
        </Box>
      </Box>
    </Drawer>
  )
}