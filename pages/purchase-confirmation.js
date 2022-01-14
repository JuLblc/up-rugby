import Link from 'next/link'

import { useRouter } from 'next/router'


const PurchasedConfirmation= () => {

  const router = useRouter();
  const {courseId , firstChapterId, firstLectureId} = router.query;
  

  return (
    <>
      <h1>Merci pour votre achat</h1>

      <Link href={`/courses/${courseId}/lecture/${firstLectureId}?chapterId=${firstChapterId}`}>
        <a>Commencer la formation</a>
      </Link>
    </>
  )
}

export default PurchasedConfirmation
