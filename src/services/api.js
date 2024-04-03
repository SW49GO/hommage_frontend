export async function getInfosUser(id, ctrl) {
    // console.log('ctrl:', ctrl)
    // console.log('id:', id)
    if (!id) {
      return 'Missing data'
    }

    try{
      const response = await fetch(`http://localhost:3000/api/user/getInfos/${ctrl}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id}),
      })
        if(response.ok){
          const data = await response.json()
          // console.log('dataFetch:', data)
          return data
        }else if(response.status===400){
          throw new Error('400')
        }
    }catch(error){
       return Promise.reject(error)
    }
}

export async function setFiles(id, src, dest){
  console.log('src:', src)
  console.log('id:', id)
  try{
    const response = await fetch (`http://localhost:3000/images/registerFile`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id:id, src:src, dest:dest}),
    })
    if(response.ok){
      const data = await response.json()
      console.log('fileFetch:', data)
      return data
    }else if(response.status===400){
      throw new Error('400')
        }
    }catch(error){
      return Promise.reject(error)
    }
  }

