// import axios from 'axios'

// const baseURL = 'https://localhost:7261' // url в режиме development

// // const baseURL = process.env.NODE_ENV === 'development' ? devUrl : prodURL // url в зависимости от режима

// /* настройка axios */
// axios.interceptors.request.use(
//   (config) => {
//     config.url = baseURL + config.url
//     config.headers['Content-Type'] = 'application/json'

//     return config
//   },
//   (err) => Promise.reject(err)
// )

// export const checkAPI = {
//   async postData(datas) {
//     // const json = JSON.stringify(datas)

//     // return axios.post('/example', JSON.stringify({ data: json }))
//     return axios.post('/example', JSON.stringify({ data: datas }))
//   },
// }
