import { Result, Row } from 'antd'

export default function NotFound() {
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Result status="404" title="Page Not Found" subTitle="Sorry, the page you visited does not exist." />
    </Row>
  )
}
