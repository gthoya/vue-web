import constant from '../constant'

export default {
  [constant.GET_CONTENTS_LIST]: (state, payload) => {
    state.contentsList = payload.contentsList
  },
  [constant.CREATE_CONTENTS_FORM]: (state) => {
    state.contents = { no: '', title: '', contentsBody: '', createDate: '', createUser: '' }
    state.mode = 'create'
    state.currentView = 'contents'
  },
  [constant.MODIFY_CONTENTS_FORM]: (state, payload) => {
    state.contents = payload.contents
    state.mode = 'modify'
    state.currentView = 'contents'
  },
  [constant.CANCEL_FORM]: (state) => {
    state.currentView = null
  },
  [constant.UPLOAD_FILE]: (state, payload) => {
    state.contents = payload.contents
    state.currentView = 'fileUpload'
  }
}
