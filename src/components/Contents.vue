<template>
  <div class="modal">
    <div class="form" @keyup.esc="cancelEvent">
      <h3 class="heading">:: {{headingText}}</h3>
      <div v-if="mode == 'modify'" class="form-group">
        <label>no</label>
        <input type="text" name="no" class="long" v-model="contents.no" disabled />
      </div>
      <div class="form-group">
        <label>제목</label>
        <input type="text" name="name" class="long" v-model="contents.title" placeholder="제목을 입력하세요." />
      </div>
      <div class="form-group">
        <label>내용</label>
        <input type="text" name="tel" class="long" v-model="contents.contentsBody" placeholder="내용을 입력하세요." />
      </div>
      <div class="form-group">
        <div>&nbsp;</div>
        <button class="btn btn-primary" @click="submitEvent()">{{btnText}}</button>
        <button class="btn btn-primary" @click="deleteEvent()" v-if="mode == 'modify'">삭제</button>
        <button class="btn btn-primary" @click="cancelEvent()">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import constant from '../constant'
import { mapState } from 'vuex'

export default {
  name: 'contentsForm',
  computed: {
    btnText: function () {
      if (this.mode !== 'modify') {
        return '추가'
      }

      return '수정'
    },
    headingText: function () {
      if (this.mode !== 'modify') {
        return '연락처 추가'
      }

      return '연락처 수정'
    },
    ...mapState(['mode', 'contents'])
  },
  methods: {
    submitEvent: function () {
      if (this.mode !== 'modify') {
        this.$store.dispatch(constant.CREATE_CONTENTS)
      } else {
        this.$store.dispatch(constant.MODIFY_CONTENTS)
      }
    },
    deleteEvent: function () {
      this.$store.dispatch(constant.DELETE_CONTENTS)
    },
    cancelEvent: function () {
      this.$store.dispatch(constant.CANCEL_FORM)
    }
  }
}
</script>

<style scoped>
  .modal { display: block; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; }
  .form { background-color: white; margin: 100px auto; max-width: 400px; min-width: 200px; font: 13px 'verdana'; padding: 10px 10px 10px 10px; }
  .form div { padding: 0; display: block; margin: 10px 0 0 0; }
  .form label { text-align: left; margin: 0 0 3px 0; padding: 0px; display: block; font-weight: bold; }
  .form input, textarea, select { box-sizing: border-box; border: 1px solid #BEBEBE; padding: 7px; margin: 0px; outline: none; }
  .form .long { width: 100%; }
</style>
