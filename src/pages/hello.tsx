import { GetServerSideProps } from 'next'
import React from 'react'

export default function Index({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name = 'world' } = context.query

  return {
    props: { name },
  }
}
