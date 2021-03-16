import Link from 'next/link'
import styled from 'styled-components'

const CustomDiv = styled.div`
  font-size: 30px;
`

export default function Index() {
  return (
    <>
      <CustomDiv>Hello yc</CustomDiv>
      <Link href={{ pathname: '/hello', query: { name: 'yceffort' } }}>
        Say Hello?
      </Link>
    </>
  )
}
