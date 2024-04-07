export async function signIn(data){
  try{
    const response = await fetch(`http://localhost:3000/api/user/signIn/setRegister`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
      if(response.ok){
        const data = await response.json()
        console.log('dataFetch:', data)
        return data
      }else if(response.status===400){
        throw new Error('400')
      }
  }catch(error){
     return Promise.reject(error)
  }
}

export async function verifyAccount(data){
  console.log('data:', data)
  try{
    const response = await fetch(`http://localhost:3000/api/user/connect/verifyAccount`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
      if(response.ok){
        const data = await response.json()
        // console.log('dataFetch:', data)
        return data
      }else if(response.status===404){
        return {message:'404'}
      }else if (response.status===401){
        return {message:'401'}
      }

  }catch(error){
     return Promise.reject(error)
  }
}

export async function getInfosUser(id,token, ctrl) {
    console.log('token:', token)
    // console.log('ctrl:', ctrl)
     console.log('id:', id)

    if (!id) {
      return 'Missing data'
    }

    try{
      const response = await fetch(`http://localhost:3000/api/user/getInfos/${ctrl}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}`},
          body: JSON.stringify({id:id}),
      })
        if(response.ok){
          const data = await response.json()
          return data
        }else if(response.status===400){
          throw new Error('400')
        }
    }catch(error){
       return Promise.reject(error)
    }
}

export async function setFiles(id, defId, dest, file){

  const formData = new FormData()
    formData.append('id', id)
    formData.append('defId', defId)
    formData.append('dest', dest)
    formData.append('image', file)


  try{
    const response = await fetch (`http://localhost:3000/api/user/registerFile`,{
      method: 'POST',
      header: {'Content-Type': 'multipart/form-data'},
      body: formData,
    })
      if(response.ok){
        return 'requete reçu'
      }else {
        const data = await response.json()
       return data
      }
    }catch(error){
      return Promise.reject(error)
    }
  }

