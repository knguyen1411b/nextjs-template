import { Row, Spin } from 'antd'

export default function Loading() {
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Spin size="large" />
    </Row>
  )
}
