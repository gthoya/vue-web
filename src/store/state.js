import conf from '../config'

export default {
  currentView: null,
  mode: 'create',
  contents: {
    no: 0,
    title: '',
    contentsBody: '',
    createDate: '',
    createUser: ''
  },
  contentsList: {
    pageno: 1,
    pagesize: conf.PAGE_SIZE,
    totalcount: 0,
    contents: []
  }
}
