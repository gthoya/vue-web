<template>
  <div>
    <div class="form" @keyup.esc="cancelEvent">
      <form method="post" encrypte="multipart/form-data">
        <h3 class="heading">:: 파일 업로드</h3>
        <input type="hidden" name="no" class="long" v-model="contents.no" disabled />
        <div>
          <label>현재 사진</label>
          <img class="thumb" v-bind:src="contents.file">
        </div>
        <div>
          <label>파일 선택</label>
          <label>
            <input ref="file" type="file" name="file" class="long btn btn-default" />
          </label>
        </div>
        <div>
          <div>&nbsp;</div>
          <button class="btn btn-primary" @click="submitEvent()">확인</button>
          <button class="btn btn-primary" @click="cancelEvent()">취소</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import constant from '../constant'
import conf from '../config'
import { mapState } from 'vuex'

export default {
  name: 'updatePhoto',
  computed: mapState(['contents']),
  methods: {
    submitEvent: function () {
      const file = this.$refs.photofile.files[0]
      this.$store.dispatch(conf.UPLOAD_FILE, { no: this.contents.no, file: file })
    },
    cancelEvent: function () {
      this.$store.dispatch(constant.CANCEL_FORM)
    }
  }
}
</script>

<style scoped>
  .form { background-color: white; margin: 100px auto; max-width: 400px; min-width: 200px; font: 13px 'verdana'; padding: 10px 10px 10px 10px; }
  .form div { padding: 0; display: block; margin: 10px 0 0 0; }
  .form label { text-align: left; margin: 0 0 3px 0; padding: 0px; display: block; font-weight: bold; }
  .form input, textarea, select { box-sizing: border-box; border: 1px solid #BEBEBE; padding: 7px; margin: 0px; outline: none; }
  .form .long { width: 100%; }
  img.thumb { width: 160px; }
</style>
