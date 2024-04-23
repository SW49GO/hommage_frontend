
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

export async function changePass(data, ctrl){
  console.log('data:', data)
  try{
    const response = await fetch(`http://localhost:3000/api/user/connect/${ctrl}`, {
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

export async function verifyAccount(data, ctrl ){
   console.log('data:', data)
  try{
    const response = await fetch(`http://localhost:3000/api/user/connect/${ctrl}`, {
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

export async function getInfos(id, token, idDef, ctrl, other) {
    console.log('other:', other)
    console.log('idDef:', idDef)
    console.log('token:', token)
    console.log('ctrl:', ctrl)
     console.log('id:', id)

    if (!id) {
      return 'Missing data'
    }

    try{
      const response = await fetch(`http://localhost:3000/api/user/getInfos/${ctrl}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}`},
          body: JSON.stringify({id:id, defunct_id:idDef, other:other}),
      })
        if(response.ok){
          const data = await response.json()
          // console.log('dataREQ:', data)
          return data
        }else if(response.status===400){
          throw new Error('400')
        }
    }catch(error){
       return Promise.reject(error)
    }
}

export async function setFiles(id, defId, dest, token, file){
// console.log('fileFETCH:', file)
// console.log('id:', id)
// console.log('token:', token)

  const formData = new FormData()
    formData.append('id', id)
    formData.append('defId', defId)
    formData.append('dest', dest)
    formData.append('image', file)

  try{
    const response = await fetch (`http://localhost:3000/api/user/registerFile`,{
      method: 'POST',
      headers: {'Authorization': `Bearer ${token}`},
      body: formData,
    })
    if (response.ok) {
      const data = await response.json()
      return data.path
  } else {
      // Gérer le cas où la réponse n'est pas OK
      return Promise.reject(new Error('Request failed'));
  }
    }catch(error){
      return Promise.reject(error)
    }
  }

  export async function updatePhoto(id, idDef, photo, token, ctrl) {
    // console.log('token:', token)
    // console.log('ctrl:', ctrl)
    //  console.log('id:', id)

    if (!id) {
      return 'Missing data'
    }

    try{
      const response = await fetch(`http://localhost:3000/api/user/updater/${ctrl}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}`},
          body: JSON.stringify({id:id, idDef:idDef, photo:photo}),
      })
        if(response.ok){
          return 'update'
        }else if(response.status===400){
          throw new Error('400')
        }
    }catch(error){
       return Promise.reject(error)
    }
}

export async function setRegister(id, token, data, ctrl){
    // console.log('dataSETREGISTER:', data)
    // console.log('id:', id)
    const user_id = id
    if(!data.user_id){data.user_id = user_id}
      // console.log('data:', data)

    try{
      const response = await fetch (`http://localhost:3000/api/user/register/${ctrl}`,{
        method: 'PUT',
        headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
        body:JSON.stringify({id:id, data:data}),
      })
      if (response.ok) {
        const data = await response.json()
        return data
    } else {
        return Promise.reject(new Error('Request failed'));
    }
      }catch(error){
        return Promise.reject(error)
      }
    }

    export async function updater(id, token, data, ctrl){
      try{
        const response = await fetch (`http://localhost:3000/api/user/updater/${ctrl}`,{
          method: 'POST',
          headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
          body:JSON.stringify({id:id, data:data}),
        })
        if (response.ok) {
          const data = await response.json()
          return data
      } else {
          return Promise.reject(new Error('Request failed'));
      }
        }catch(error){
          return Promise.reject(error)
        }
    }

    export async function deleter(id, idDef, token, ctrl, data){
      // console.log('DELETER')
      try{
        const response = await fetch (`http://localhost:3000/api/user/deleter/${ctrl}`,{
          method: 'POST',
          headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
          body:JSON.stringify({id:id, idDef:idDef, idComment:data.idComment}),
        })
          if (response.ok) {
            return 'succes de la suppression'
          } else {
              return Promise.reject(new Error('Request failed'))
          }
      }catch(error){
        return Promise.reject(error)
      }
    }