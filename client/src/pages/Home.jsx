import React, { useState, useEffect } from 'react'
import { Loader, Card, FormField } from '../components'
 
const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} {...post} />)
    }
    return (
      <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
        {title}
      </h2>
    )
  }

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState('azerty')

  const fetchPosts = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        setAllPosts(result.data.reverse())
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [])

  {
    /* Fonction qui rend des cartes (<Card>) en utilisant les données fournies dans data.
 Si data est non vide (data?.length > 0), alors la fonction renvoie une liste des cartes
 (data.map((post) => <Card key={post._id} {...post} />)). 
Sinon, elle renvoie un en-tête avec un titre spécifié 
(<h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>). */
  }

 
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Vitrine de la communauté
        </h1>
        <p className="mt-2 text-[#246298] text-[18px] max-w-[500px]">
          Parcourez une collection d'images imaginatives et visuellement
          époustouflantes généré par DALL-E AI
        </p>
      </div>
      <div className="mt-16">
        <FormField />
      </div>

      {/* Si "loading" est vrai, il affichera un loader centré à l'écran. Sinon,
       il affichera un message de résultats avec le texte de recherche si celui-ci est disponible,
        sinon il affichera un message indiquant qu'aucun post n'a été trouvé.
         Les résultats seront affichés dans un grid.*/}

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Affichage des résultats pour 
                 {' '}<span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={allPosts} title="Aucun résultat trouvé" />
              ) : (
                <RenderCards data={[]} title="Aucun post trouvé" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home
