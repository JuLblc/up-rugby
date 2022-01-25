import Link from 'next/link'

import { useRouter } from 'next/router'


const PurchasedConfirmation= () => {

  const router = useRouter();
  const {course , chapter, lecture} = router.query;  

  return (
    <>
      <h1>Merci pour votre achat</h1>

      <Link href={`/courses/${course}/lecture/${lecture}?chapter=${chapter}`}>
        <a>Commencer la formation</a>
      </Link>
    </>
  )
}

export default PurchasedConfirmation
