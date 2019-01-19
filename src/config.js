/* eslint-disable no-template-curly-in-string */
const BASE_URL = '/api'
const CONTENTS = '/contents'

export default {
  PAGE_SIZE: 5,
  GET_CONTENTS_LIST: BASE_URL + '/contentsList',
  GET_CONTENTS: BASE_URL + CONTENTS + '/$no',
  CREATE_CONTENTS: BASE_URL + CONTENTS + '/create',
  MODIFY_CONTENTS: BASE_URL + CONTENTS + '/modify',
  DELETE_CONTENTS: BASE_URL + CONTENTS + '/unused' + '/$no',
  UPLOAD_FILE: BASE_URL + '/uploadFile'
}
