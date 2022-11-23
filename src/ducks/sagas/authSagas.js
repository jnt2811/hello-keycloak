import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";
import { doCheckUser, updateUser } from "../slices/authSlice";

const apis = {
  check_password:
    "https://gateway.dev.deepcare.vn/cis/api/partner/public/nhansu/kiemTraMatKhauNguoiDung",
};

export function* watchDoAuth() {
  yield takeLatest(doCheckUser.type, handleCheckUser);
}

export function* handleCheckUser(action) {
  try {
    const { token, info } = action.payload;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const req = {
      partner_code: info.partner_code,
      USER_ID: info.nhansu_id,
      PASSWORD: info.password,
      TYPE: "NHAN_SU",
    };

    const { data: res } = yield call(() => axios.post(apis.check_password, req, config));

    if (res.status === "OK") {
      yield put(updateUser(res.NHAN_SU));
    } else {
      throw JSON.stringify(res);
    }
  } catch (error) {
    console.log(error);
  }
}
