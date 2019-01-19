<template>
  <div>
    <p class="addNew">
      <button class="btn btn-primary" @click="addContents()">글쓰기</button>
    </p>
    <div id="board">
      <table id="list" class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>no</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일시</th>
          </tr>
        </thead>
        <tbody id="contents">
          <tr v-for="contents in contentsList" v-bind:key="contents.no">
            <td>{{contents.no}}</td>
            <td>{{contents.title}}</td>
            <td>{{contents.createUser}}</td>
            <td>{{contents.createDate}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <paginate ref="pageButtons"
      :page-count="totalPage"
      :page-range="7"
      :margin-pages="3"
      :click-handler="pageChanged"
      :prev-text="'이전'"
      :next-text="'다음'"
      :container-class="'pageNation'"
      :page-class="'page-item'">
    </paginate>
  </div>
</template>

<script>
import constant from '../constant'
import { mapState } from 'vuex'
import paginate from 'vuejs-paginate'

export default {
  name: 'contentsList',
  components: { paginate },
  computed: {
    totalPage: function () {
      return Math.floor((this.contentsList.totalcount - 1) / this.contentsList.pagesize) + 1
    },
    ...mapState(['contentsList'])
  },
  mounted: function () {
    this.$store.dispatch(constant.GET_CONTENTS_LIST, { pageno: 1 })
  },
  watch: {
    'contentsList.pageno': function () {
      this.$refs.pageButtons.selected = this.contentsList.pageno - 1
    }
  },
  methods: {
    pageChanged: function (page) {
      this.$store.dispatch(constant.GET_CONTENTS_LIST, { pageno: page })
    },
    addContents: function () {
      this.$store.dispatch(constant.CREATE_CONTENTS_FORM)
    }
  }
}
</script>

<style scoped>
  .addNew { margin: 10px auto; max-width: 100%; min-width: 100%; padding: 40px 0px 0px 0px; text-align: left; }
  #board { margin: 10px auto; max-width: 100%; min-width: 100%; padding: 0px; position: relative; font: 13px 'verdana';}
  #board input, textarea, select { box-sizing: border-box; border: 1px solid #BEBEBE; padding: 7px; margin: 0px; outline: none;}
  #list { width: 97%; font: 13px 'verdana'; }
</style>
