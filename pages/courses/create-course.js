import axios from 'axios'

import { useState } from 'react'
import Chapter from '../../components/Chapter'

import Formation from '../../components/Formation'

const NewCourse = () => {
  /*To Do*/
  /*
    0. Protéger la route pour admin seulement
    */

  const emptyCourse = {
    title: '',
    overview: '',
    category: '',
    price: '',
    //image: '',
    chapters: [
      {
        title: '',
        lectures: [
          {
            title: '',
            description: '',
            url: ''
          }
        ]
      }
    ],
    isPublished: false,
  }

  return (
    <>
      <h1>Ajouter formation</h1>

      <Formation courseContent={emptyCourse} action={'create'} disable={false}/>
    </>
  )
}

export default NewCourse
