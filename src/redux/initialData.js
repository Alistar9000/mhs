import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    value: {
      data: [],
      chartdata: [],
      scrolltop: [],
      topcards: [],
      toolbar: [[], []],
      showdeletedialoge: { flag: false, id: -1, name: "" },
      adduserdialog: 0,
      deletesabadconfirm: { confirm: false, success: false },
      addsabadconfirm: { confirm: false, success: false },
      editsabadconfirm: { confirm: false, success: false },
      showdisabledialoge: { flag: 0, id: -1, name: "", status: -1 },
      disablesabadconfirm: { confir: false, success: false, status: -1 },
      allchartdata30: {},
      allchartdata: [],
      chartdata: [],
      allchartflag:false,
      fullchart: { name: "", flag: 0 },
      hamberger: { value: false },
      screensnipper: false,
      buttonsnipper: false,
      redirect: false,
      cardsnipper: false,
      circlesnipper: false,
      headername: "",
      userssort:{name:'',trend:''},
      userheadermoreindex: null,
      usersmoreindex: null,
      userdetailmoreindex: false,
      userlistmoreindex: null,
      userindex: 1,
      charttimeindex: 0,
      repeatUser:false,
      floatingsearch: '',
      hidefloatingsearch:'',
      formemptycheck: [
        { name: "name", empty: false, digit: true },
        { name: "initial_money", empty: false, digit: true },
        { name: "commision", empty: false, digit: true },
      ],
      portfoemptycheck:false,
    },
  },
  reducers: {
    setDeleteDialoge: (state, action) => {
      state.value.showdeletedialoge = action.payload;
    },
    setUserIndex: (state, action) => {
      state.value.userindex = action.payload;
    },
    setRepeatUser: (state, action) => {
      state.value.repeatUser = action.payload;
    },
    setAllChartFlag: (state, action) => {
      state.value.allchartflag = action.payload;
    },
    setFormEmptyCheck: (state, action) => {
      const n = action.payload;
      const name = n[0];
      const value = n[1];
      const digit = n[2];

      const f = state.value.formemptycheck;

      state.value.formemptycheck.forEach((element) => {
        if (element.name == name) {
          element.empty = value;
          element.digit = digit;
        }
      });
      //   state.value.formemptycheck = [...state.value.formemptycheck,{[name]:value,digit:digit}];
      //  console.log(JSON.stringify(state.value.formemptycheck));
    },
    setChartTimeIndex: (state, action) => {
      state.value.charttimeindex = action.payload;
    },
    setData: (state, action) => {
      state.value.data = action.payload;
    },
    getFullChart: (state, action) => {
      state.value.fullchart = action.payload;
    },
    setChartdata: (state, action) => {
      state.value.chartdata = action.payload;
    },
    setHeaderName: (state, action) => {
      state.value.headername = action.payload;
    },
    setUsersSort: (state, action) => {
      state.value.userssort = action.payload;
    },
    sethidefloatingsearch: (state, action) => {
      state.value.hidefloatingsearch = action.payload;
      // console.log('hide in redix',state.value.hidefloatingsearch)
    },
    setUserHeaderMoreIndex: (state, action) => {
      state.value.userheadermoreindex = action.payload;
    },
    setUsersMoreIndex: (state, action) => {
      state.value.usersmoreindex = action.payload;
    },
    setUserdetailMoreIndex: (state, action) => {
      state.value.userdetailmoreindex = action.payload;
    },
    setFloatingsearchId: (state, action) => {
      state.value.floatingsearch = action.payload;
    },
    setUserListMoreIndex: (state, action) => {
      state.value.userlistmoreindex = action.payload;
    },
    setPortfoEmptyCheck: (state, action) => {
      state.value.portfoemptycheck = action.payload;
    },
    setredirect: (state, action) => {
      state.value.redirect = action.payload;
    },
    setCardSnipper: (state, action) => {
      state.value.cardsnipper = action.payload;
    },
    setscreenSnipper: (state, action) => {
      state.value.screensnipper = action.payload;
    },
    setButtonSnipper: (state, action) => {
      state.value.buttonsnipper = action.payload;
    },
    setAllChartdata30: (state, action) => {
      state.value.allchartdata30 = action.payload;
    },
    setAllChartdata: (state, action) => {
      state.value.allchartdata = action.payload;
      
    },
    setScroll: (state, action) => {
      state.value.scrolltop.push(action.payload);
    },
    setTopCards: (state, action) => {
      state.value.topcards = action.payload;
      //  console.log('topcards in redux : '+state.value.topcards.length);
    },
    setToolbar: (state, action) => {
      state.value.toolbar = action.payload;
    },
    setToolbar1: (state, action) => {
      state.value.toolbar[1] += action.payload;
    },
    setToolbar2: (state, action) => {
      state.value.toolbar[2] += action.payload;
    },
    setToolbar3: (state, action) => {
      state.value.toolbar[3] += action.payload;
    },
    setToolbar4: (state, action) => {
      state.value.toolbar[4] += action.payload;
    },
    showDeleteDialoge: (state, action) => {
      action.payload == false
        ? (state.value.showdeletedialoge.flag = false)
        : action.payload == true
        ? (state.value.showdeletedialoge.flag = true)
        : (state.value.showdeletedialoge = action.payload);
    },
    showDisableDialoge: (state, action) => {
      action.payload == false
        ? (state.value.showdisabledialoge.flag = false)
        : action.payload == true
        ? (state.value.showdisabledialoge.flag = true)
        : (state.value.showdisabledialoge = action.payload);
    },
    deleteSabadConfirm: (state, action) => {
      state.value.deletesabadconfirm = action.payload;
    },
    addSabadConfirm: (state, action) => {
      state.value.addsabadconfirm = action.payload;
    },
    editSabadConfirm: (state, action) => {
      state.value.editsabadconfirm = action.payload;
    },
    disableSabadConfirm: (state, action) => {
      state.value.disablesabadconfirm = action.payload;
    },
    DeleteSabad: (state, action) => {
      const d = [...state.value.data].filter((e) => e.id !== action.payload);
      updateToolbar(state, action.payload, 1);
      state.value.data = d;
    },
    setAddUserDialog: (state, action) => {
      state.value.adduserdialog = action.payload;
    },
    updateDataStatus: (state, action) => {
      const data = [...state.value.data];
      const payload = action.payload;
      const id = payload[0];
      const status = payload[1];
      const sabad = data.filter((e) => e.id === id);
      sabad[0].status = status;
    },
    UpdateToolbar: (state, action) => {
      updateToolbar(state, action.payload[0], action.payload[1]);
    },
    setHamberger: (state, action) => {
      state.value.hamberger = action.payload;
    },
    setSnipper: (state, action) => {
      state.value.snipper = action.payload;
    },
  },
});
export const updateToolbar = (state, id, flag) => {
  const f = [...state.value.data].filter((e) => e.id === id);
  flag === 1
    ? (state.value.toolbar[0][0] -= f[0].initial_money)
    : (state.value.toolbar[0][0] += +f[0].initial_money);
  flag === 1
    ? (state.value.toolbar[0][1] -= f[0].sabadValue)
    : (state.value.toolbar[0][1] += +f[0].sabadValue);
  state.value.toolbar[0][2] = Math.abs(
    state.value.toolbar[0][1] - state.value.toolbar[0][0]
  );
  flag === 1
    ? (state.value.toolbar[0][3] -= f[0].agentpart)
    : (state.value.toolbar[0][3] += +f[0].agentpart);
  if (flag === 1) {
    f[0].percent >= 0 && state.value.toolbar[0][4]--;
    f[0].percent < 0 && state.value.toolbar[0][5]--;
  } else {
    f[0].percent >= 0 && state.value.toolbar[0][4]++;
    f[0].percent < 0 && state.value.toolbar[0][5]++;
  }
};
export const {
  setChartTimeIndex,
  setUserIndex,
  setSnipper,
  setHamberger,
  getFullChart,
  setAllChartdata,
  setAllChartdata30,
  UpdateToolbar,
  updateDataStatus,
  disableSabadConfirm,
  showDisableDialoge,
  deleteSabadConfirm,
  setAddUserDialog,
  setChartdata,
  DeleteSabad,
  showDeleteDialoge,
  setData,
  setButtonSnipper,
  setScroll,
  setredirect,
  setToolbar,
  setToolbar1,
  setToolbar2,
  setToolbar3,
  setToolbar4,
  setTopCards,
  setCardSnipper,
  setscreenSnipper,
  setHeaderName,
  setUserHeaderMoreIndex,
  setUserListMoreIndex,
  setUsersMoreIndex,
  setFormEmptyCheck,
  addSabadConfirm,
  editSabadConfirm,
  setFloatingsearchId,
  sethidefloatingsearch,
  setUserdetailMoreIndex,
  setUsersSort,
  setPortfoEmptyCheck,
  setAllChartFlag,
  setRepeatUser,
} = dataSlice.actions;
export default dataSlice.reducer;
