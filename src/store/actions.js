import constant from '../constant'
import axios from 'axios'
import conf from '../config'

export default {
  [constant.GET_CONTENTS_LIST]: (store, payload) => {
    let pageno
    const pagesize = store.state.contentsList.pagesize

    if (typeof payload === 'undefined' || typeof payload.pageno === 'undefined') {
      pageno = 1
    } else {
      pageno = payload.pageno
    }

    axios.get(conf.GET_CONTENTS_LIST, {
      contents: { pageno: pageno, pagesize: pagesize }
    }).then((response) => {
      console.log(response)
      store.commit(constant.GET_CONTENTS_LIST, { contentsList: response })
    })
  },
  [constant.GET_CONTENTS]: (store, payload) => {
    axios.get(conf.GET_CONTENTS, {
      params: { id: payload.no }
    }).then((response) => {
      store.commit(constant.GET_CONTENTS_FORM, { contents: response.data })
    })
  },
  [constant.CANCEL_FORM]: (store) => {
    store.commit(constant.CANCEL_FORM)
  },
  [constant.CREATE_CONTENTS_FORM]: (store) => {
    store.commit(constant.CREATE_CONTENTS_FORM)
  },
  [constant.CREATE_CONTENTS]: (store) => {
    axios.post(conf.CREATE_CONTENTS, store.state.contents)
      .then((response) => {
        if (response.data.status === 'success') {
          store.dispatch(constant.CANCEL_FORM)
          store.dispatch(constant.GET_CONTENTS_LIST, { pageno: 1 })
        } else {
          console.log('게시글 추가 실패 : ' + response.data)
        }
      })
  },
  [constant.MODIFY_CONTENTS_FORM]: (store, payload) => {
    axios.get(conf.GET_CONTENTS.replace('{no}', payload.no))
      .then((response) => {
        store.commit(constant.MODIFY_CONTENTS_FORM, { contents: response.data })
      })
  },
  [constant.MODIFY_CONTENTS]: (store) => {
    const currentPageNo = store.state.contentsList.pageno
    const contents = store.state.contents

    axios.put(conf.MODIFY_CONTENTS.replace('{no}', contents.no), contents)
      .then((response) => {
        if (response.data.status === 'success') {
          store.dispatch(constant.CANCEL_FORM)
          store.dispatch(constant.GET_CONTENTS_LIST, { pageno: currentPageNo })
        } else {
          console.log('게시글 변경 실패 : ' + response.data)
        }
      })
  },
  [constant.DELETE_CONTENTS]: (store, payload) => {
    let currentPageNo = store.state.contentsList.pageno

    axios.delete(conf.DELETE_CONTENTS.replace('{no}', payload.no))
      .then(() => {
        store.dispatch(constant.DELETE_CONTENTS, { pageno: currentPageNo })
      })
  },
  [constant.UPLOAD_FILE_FORM]: (store, payload) => {
    axios.get(conf.GET_CONTENTS.replace('{no}', payload.no))
      .then((response) => {
        store.commit(constant.UPLOAD_FILE_FORM, { contents: response.data })
      })
  },
  [constant.UPLOAD_FILE]: (store, payload) => {
    const currentPageNo = store.state.contentsList.pageno
    let data = new FormData()
    data.append('photo', payload.file)
    axios.post(conf.UPLOAD_FILE, data)
      .then(() => {
        store.dispatch(constant.CANCEL_FORM)
        store.dispatch(constant.GET_CONTENTS_LIST, { pageno: currentPageNo })
      })
  }
}
