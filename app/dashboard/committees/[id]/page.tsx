import React from 'react';

export async function generateStaticParams() {
  const posts = await fetch('http://localhost:4444/api/v1/committee').then((res) => res.json());
 
  return posts?.committee?.map((post: any) => ({
    params: {
      id: post.slug,
    }
  }));
}

export default function SingleCommittee({ params }: { params: { id: string } }) {
  return (
    <div>
        <div>My Committee: {params.id}</div>
    </div>
  );
}
