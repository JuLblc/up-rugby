import { useEditor, EditorContent } from '@tiptap/react'
import { useState } from 'react'
import StarterKit from '@tiptap/starter-kit'

import styles from '../styles/Formation.module.css'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .unsetAllMarks()
            .run()
        }
      >
        clear marks
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .clearNodes()
            .run()
        }
      >
        clear nodes
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .setParagraph()
            .run()
        }
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 1 })
            .run()
        }
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 2 })
            .run()
        }
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 3 })
            .run()
        }
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 4 })
            .run()
        }
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 5 })
            .run()
        }
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 6 })
            .run()
        }
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBulletList()
            .run()
        }
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleOrderedList()
            .run()
        }
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleCodeBlock()
            .run()
        }
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBlockquote()
            .run()
        }
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .setHorizontalRule()
            .run()
        }
      >
        horizontal rule
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .setHardBreak()
            .run()
        }
      >
        hard break
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </button>
      <button
        type='button'
        onClick={() =>
          editor
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </button>
    </>
  )
}

const Tiptap = props => {
  console.log('props Tiptap: ', props)

  const [editorHtmlContent, setEditorHtmlContent] = useState(
    props.courseData.overview
  )

  const updateParentState = () => {}

  const editor = useEditor({
    extensions: [StarterKit],
    content: editorHtmlContent,
    onUpdate: ({ editor }) => {
      setEditorHtmlContent(editor.getHTML())
      
      const newCourseData = { ...props.courseData }
      newCourseData.overview = editor.getHTML()
      console.log('editorHtmlContent: ', editor.getHTML())
      console.log('newCourseData from Tiptap: ', newCourseData)

      props.updateStateFromChild(newCourseData)
    }
  })

  return (
    <div className={styles.tipTapContainer}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
