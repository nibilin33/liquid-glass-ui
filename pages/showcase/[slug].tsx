import { useRouter } from 'next/router';
import { Card } from '../../components/Card';
import {
    TypeWriter
} from '../../components/TypeWriter';   

export default function ShowcaseDetail() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <Card title={slug}>
      <div className="p-8 text-center text-gray-500">
        <TypeWriter text="Waiting for component details...">
        </TypeWriter>
      </div>
    </Card>
  )
}