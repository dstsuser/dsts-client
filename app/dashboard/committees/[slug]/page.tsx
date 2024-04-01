
export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params
    
        return (
            <div>
                <h1>Committee: {slug}</h1>
            </div>
        )
  }