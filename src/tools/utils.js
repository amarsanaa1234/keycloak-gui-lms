import { message, Tag } from "antd";
import {
  ApartmentOutlined,
  AuditOutlined,
  BankOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ContainerOutlined,
  EditOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  FormOutlined,
  FundViewOutlined,
  LoadingOutlined,
  SendOutlined,
  SettingOutlined,
  SyncOutlined,
  UndoOutlined,
  WarningOutlined
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import React from "react";

var CryptoJS = require("crypto-js");
const dateFormat = "YYYY-MM-DD HH:mm:mm";
const resultCode = {
  Error: 0,
  Success: 1,
  Warning: 2,
  Auth: 4
};

const successMsg = {
  save: "Амжилттай хадгаллаа",
  refresh: "Амжилттай шинэчиллээ",
  confirm: "Амжилттай баталгаажлаа",
  delete: "Амжилттай устгагдлаа",
  sendRequest: "Хүсэлт амжилттай илгээгдлээ"
};

const {REACT_APP_TOKEN} = process.env;
const encryptValue = (value) => {
  return CryptoJS.AES.encrypt(value.toString(), REACT_APP_TOKEN).toString();
};
const decryptValue = (value) => {
  let bytes = CryptoJS.AES.decrypt(value.toString(), REACT_APP_TOKEN);
  return bytes.toString(CryptoJS.enc.Utf8);
};
const getErrorMsg = (err, withoutShow) => {
  // const { systemExceptionMessages } =
  //   React.useContext(contextLogin);
  let errType = "error";
  let errMsg = null;
  let errDesc = null;
  if (!errMsg && err.request) {
    if (err.request.status === 500) {
      if (err.request.responseType === "blob") {
        errMsg = "Файлын сангаас өгөгдөл олдсонгүй.";
      } else if (err.request.responseText) {
        var obj = JSON.parse(err.request.responseText);
        if (obj?.statusCode === 602) {
          errType = "warn";
          errMsg = obj.status;
          errDesc = obj.message;
        }
        errMsg = obj.message;
        if (obj.message?.includes("Read timed out executing GET")) {
          if (obj.message?.includes("/getCitizenIDCardInfo?regNo=")) {
            errMsg = "ХУР - сервистnpmэй холбогдож чадсангүй";
          }
        }
      } else
        errMsg = "Сервис дуудах үеийн алдаа.";
    } else if (err.request.status === 502)
      errMsg = `Системийн шинэчлэл хийгдэж байна. Түр хүлээнэ үү.`;
    else if (err.request.status === 504)
      errMsg = `Сервeрт холбогдож чадсангүй.`;
  }

  if (!errMsg && err && err.response && err.response.data) {
    errMsg = err.response.data.message
      ? err.response.data.message
      : err.response.data.error;
  }

  if (!errMsg && err && (err.message || err.msg)) {
    errMsg = err.message ? err.message : err.msg;
  }

  if (!errMsg && err) {
    errMsg = err;
  }
  if (!axios.isCancel(err) && errMsg && !withoutShow) {
    message.error(errMsg);
  }
  return errMsg;
};
const getResultFromResponse = (res) => {
  if (!res) {
    message.error("Серверт холбогдож чадсангүй.");
    return undefined;
  }

  if (res.code === resultCode.Warning) {
    message.warning(res.warnings.map((warn) => warn.msg).join("\n - "));
    return undefined;
  }
  if (res.code === resultCode.Error) {
    message.error("1::" + res.msg);
    return undefined;
  }
  if (res.code === resultCode.Auth) {
    message.error("2::" + res.msg);
    return undefined;
  }
  return res.result;
};
const getExceptionObj = (err, withoutShow) => {
  let errType = "error";
  let errMsg = null;
  if (err.request) {
    if (err.request.status === 500) {
      if (err.request.responseType === "blob") {
        errMsg = "Файлын сангаас өгөгдөл олдсонгүй.";
      } else if (err.request.responseText) {
        var obj = JSON.parse(err.request.responseText);
        if (obj?.statusCode === 602) {
          errType = "warn";
        }
        errMsg = obj.message;
        if (obj.message?.includes("Read timed out executing GET")) {
          if (obj.message?.includes("/getCitizenIDCardInfo?regNo=")) {
            errMsg = "ХУР - сервистnpmэй холбогдож чадсангүй";
          }
        }
      } else
        errMsg = "Сервис дуудах үеийн алдаа.";
    } else if (err.request.status === 502)
      errMsg = `Системийн шинэчлэл хийгдэж байна. Түр хүлээнэ үү.`;
    else if (err.request.status === 504)
      errMsg = `Сервeрт холбогдож чадсангүй.`;
  }

  if (!errMsg && err && err.response && err.response.data) {
    errMsg = err.response.data.message
      ? err.response.data.message
      : err.response.data.error;
  }

  if (!errMsg && err && (err.message || err.msg)) {
    errMsg = err.message ? err.message : err.msg;
  }

  if (!errMsg && err) {
    errMsg = err;
  }

  if(errMsg && errMsg.includes('\'responseType\' is \'\' or \'text\' (was \'blob\').'))
    errMsg="Файлийн сангаас олдсонгүй.";
  return {code: errMsg, type: errType};
};
const showErrorMsg = (err, _) => {
  getErrorMsg(err);
  // if (!axios.isCancel(err)) {
  //   if (dur) message.error(getErrorMsg(err), dur);
  //   else
  //   message.error(getErrorMsg(err));
  // }
};
const activeStatus = {
  Inactive: 0,
  Active: 1,
  ComingSoon: 2
};

const getActiveStatusTag = (status) => {
  if (status === activeStatus.Active)
    return <Tag color="success" icon={<CheckCircleOutlined />}>Идэвхтэй</Tag>;
  if (status === activeStatus.Inactive)
    return <Tag color="error" icon={<CloseCircleOutlined />}>Идэвхгүй</Tag>;
  if (status === activeStatus.ComingSoon)
    return <Tag color="processing" icon={<SyncOutlined spin />}>Хүлээгдэж буй</Tag>;
  return <Tag>Тодорхойгүй</Tag>;
};

const newsType = {
  NEWS: {code: "NEWS", name: "Мэдээ мэдээлэл", color: "purple", id: 1},
  LANDING: {
    code: "LANDING",
    name: "Нүүр хуудасны мэдээлэл",
    color: "magenta",
    id: 2
  },
  FOOTER: {code: "FOOTER", name: "FOOTER мэдээлэл", color: "geekblue", id: 3}
};

const newsCategoryTypes = {
  NEWS: 1,
  SYSTEM: 2
};

const newsTypeArray = [
  {id: 1, name: "NEWS", color: "purple"},
  {id: 2, name: "LANDING", color: "magenta"},
  {id: 3, name: "FOOTER", color: "geekblue"}
];

const perRoleType = [
  {name: "Байгууллага", id: 1, color: "green"},
  {name: "Яам", id: 2, color: "cyan"}
];

const expressionType = {
  Uncheck: "Uncheck",
  Check: "Check",
  SetValue: "SetValue"
};

const perMapUserRoleStatus = {
  InActive: {
    id: 0,
    name: "Идэвхгүй",
    nameAction: "Цуцалсан",
    color: "default"
  },
  Waiting: {
    id: 1,
    name: "Хүлээгдэж буй",
    nameAction: "Хүлээгдэж буй",
    color: "warning"
  },
  Processing: {
    id: 2,
    name: "Хүсэлт илгээсэн",
    nameAction: "Хүсэлт илгээсэн",
    color: "processing"
  },
  Confirmed: {
    id: 3,
    name: "Идэвхтэй",
    nameAction: "Баталгаажсан",
    color: "success"
  }
};

const perMapUserRoleActionStatus = {
  SENT: {
    id: 0,
    name: "Хүсэлт илгээсэн",
    color: "processing"
  },
  CONFIRMED: {
    id: 1,
    name: "Баталгаажсан",
    color: "success"
  },
  DELETE: {
    id: 2,
    name: "Устггасан",
    color: "error"
  },
  CANCELED: {
    id: 3,
    name: "Цуцалсан",
    color: "warning"
  }
};
const roleTypeStatus = {
  Organization: 1,
  Branch: 2,
  Admin: 3
};

const reportReportWritingConfigType = {
  ConnectDirectly: 1,
  sentRequest: 2
};


const countryList = [
  {name: "Afghanistan", code: "AF"},
  {name: "land Islands", code: "AX"},
  {name: "Albania", code: "AL"},
  {name: "Algeria", code: "DZ"},
  {name: "American Samoa", code: "AS"},
  {name: "AndorrA", code: "AD"},
  {name: "Angola", code: "AO"},
  {name: "Anguilla", code: "AI"},
  {name: "Antarctica", code: "AQ"},
  {name: "Antigua and Barbuda", code: "AG"},
  {name: "Argentina", code: "AR"},
  {name: "Armenia", code: "AM"},
  {name: "Aruba", code: "AW"},
  {name: "Australia", code: "AU"},
  {name: "Austria", code: "AT"},
  {name: "Azerbaijan", code: "AZ"},
  {name: "Bahamas", code: "BS"},
  {name: "Bahrain", code: "BH"},
  {name: "Bangladesh", code: "BD"},
  {name: "Barbados", code: "BB"},
  {name: "Belarus", code: "BY"},
  {name: "Belgium", code: "BE"},
  {name: "Belize", code: "BZ"},
  {name: "Benin", code: "BJ"},
  {name: "Bermuda", code: "BM"},
  {name: "Bhutan", code: "BT"},
  {name: "Bolivia", code: "BO"},
  {name: "Bosnia and Herzegovina", code: "BA"},
  {name: "Botswana", code: "BW"},
  {name: "Bouvet Island", code: "BV"},
  {name: "Brazil", code: "BR"},
  {name: "British Indian Ocean Territory", code: "IO"},
  {name: "Brunei Darussalam", code: "BN"},
  {name: "Bulgaria", code: "BG"},
  {name: "Burkina Faso", code: "BF"},
  {name: "Burundi", code: "BI"},
  {name: "Cambodia", code: "KH"},
  {name: "Cameroon", code: "CM"},
  {name: "Canada", code: "CA"},
  {name: "Cape Verde", code: "CV"},
  {name: "Cayman Islands", code: "KY"},
  {name: "Central African Republic", code: "CF"},
  {name: "Chad", code: "TD"},
  {name: "Chile", code: "CL"},
  {name: "China", code: "CN"},
  {name: "Christmas Island", code: "CX"},
  {name: "Cocos (Keeling) Islands", code: "CC"},
  {name: "Colombia", code: "CO"},
  {name: "Comoros", code: "KM"},
  {name: "Congo", code: "CG"},
  {name: "Congo, The Democratic Republic of the", code: "CD"},
  {name: "Cook Islands", code: "CK"},
  {name: "Costa Rica", code: "CR"},
  {name: "Croatia", code: "HR"},
  {name: "Cuba", code: "CU"},
  {name: "Cyprus", code: "CY"},
  {name: "Czech Republic", code: "CZ"},
  {name: "Denmark", code: "DK"},
  {name: "Djibouti", code: "DJ"},
  {name: "Dominica", code: "DM"},
  {name: "Dominican Republic", code: "DO"},
  {name: "Ecuador", code: "EC"},
  {name: "Egypt", code: "EG"},
  {name: "El Salvador", code: "SV"},
  {name: "Equatorial Guinea", code: "GQ"},
  {name: "Eritrea", code: "ER"},
  {name: "Estonia", code: "EE"},
  {name: "Ethiopia", code: "ET"},
  {name: "Falkland Islands (Malvinas)", code: "FK"},
  {name: "Faroe Islands", code: "FO"},
  {name: "Fiji", code: "FJ"},
  {name: "Finland", code: "FI"},
  {name: "France", code: "FR"},
  {name: "French Guiana", code: "GF"},
  {name: "French Polynesia", code: "PF"},
  {name: "French Southern Territories", code: "TF"},
  {name: "Gabon", code: "GA"},
  {name: "Gambia", code: "GM"},
  {name: "Georgia", code: "GE"},
  {name: "Germany", code: "DE"},
  {name: "Ghana", code: "GH"},
  {name: "Gibraltar", code: "GI"},
  {name: "Greece", code: "GR"},
  {name: "Greenland", code: "GL"},
  {name: "Grenada", code: "GD"},
  {name: "Guadeloupe", code: "GP"},
  {name: "Guam", code: "GU"},
  {name: "Guatemala", code: "GT"},
  {name: "Guernsey", code: "GG"},
  {name: "Guinea", code: "GN"},
  {name: "Guinea-Bissau", code: "GW"},
  {name: "Guyana", code: "GY"},
  {name: "Haiti", code: "HT"},
  {name: "Heard Island and Mcdonald Islands", code: "HM"},
  {name: "Holy See (Vatican City State)", code: "VA"},
  {name: "Honduras", code: "HN"},
  {name: "Hong Kong", code: "HK"},
  {name: "Hungary", code: "HU"},
  {name: "Iceland", code: "IS"},
  {name: "India", code: "IN"},
  {name: "Indonesia", code: "ID"},
  {name: "Iran, Islamic Republic Of", code: "IR"},
  {name: "Iraq", code: "IQ"},
  {name: "Ireland", code: "IE"},
  {name: "Isle of Man", code: "IM"},
  {name: "Israel", code: "IL"},
  {name: "Italy", code: "IT"},
  {name: "Jamaica", code: "JM"},
  {name: "Japan", code: "JP"},
  {name: "Jersey", code: "JE"},
  {name: "Jordan", code: "JO"},
  {name: "Kazakhstan", code: "KZ"},
  {name: "Kenya", code: "KE"},
  {name: "Kiribati", code: "KI"},
  {name: "Korea, Republic of", code: "KR"},
  {name: "Kuwait", code: "KW"},
  {name: "Kyrgyzstan", code: "KG"},
  {name: "Latvia", code: "LV"},
  {name: "Lebanon", code: "LB"},
  {name: "Lesotho", code: "LS"},
  {name: "Liberia", code: "LR"},
  {name: "Libyan Arab Jamahiriya", code: "LY"},
  {name: "Liechtenstein", code: "LI"},
  {name: "Lithuania", code: "LT"},
  {name: "Luxembourg", code: "LU"},
  {name: "Macao", code: "MO"},
  {name: "Macedonia, The Former Yugoslav Republic of", code: "MK"},
  {name: "Madagascar", code: "MG"},
  {name: "Malawi", code: "MW"},
  {name: "Malaysia", code: "MY"},
  {name: "Maldives", code: "MV"},
  {name: "Mali", code: "ML"},
  {name: "Malta", code: "MT"},
  {name: "Marshall Islands", code: "MH"},
  {name: "Martinique", code: "MQ"},
  {name: "Mauritania", code: "MR"},
  {name: "Mauritius", code: "MU"},
  {name: "Mayotte", code: "YT"},
  {name: "Mexico", code: "MX"},
  {name: "Micronesia, Federated States of", code: "FM"},
  {name: "Moldova, Republic of", code: "MD"},
  {name: "Monaco", code: "MC"},
  {name: "Mongolia", code: "MN"},
  {name: "Montenegro", code: "ME"},
  {name: "Montserrat", code: "MS"},
  {name: "Morocco", code: "MA"},
  {name: "Mozambique", code: "MZ"},
  {name: "Myanmar", code: "MM"},
  {name: "Namibia", code: "NA"},
  {name: "Nauru", code: "NR"},
  {name: "Nepal", code: "NP"},
  {name: "Netherlands", code: "NL"},
  {name: "Netherlands Antilles", code: "AN"},
  {name: "New Caledonia", code: "NC"},
  {name: "New Zealand", code: "NZ"},
  {name: "Nicaragua", code: "NI"},
  {name: "Niger", code: "NE"},
  {name: "Nigeria", code: "NG"},
  {name: "Niue", code: "NU"},
  {name: "Norfolk Island", code: "NF"},
  {name: "Northern Mariana Islands", code: "MP"},
  {name: "Norway", code: "NO"},
  {name: "Oman", code: "OM"},
  {name: "Pakistan", code: "PK"},
  {name: "Palau", code: "PW"},
  {name: "Palestinian Territory, Occupied", code: "PS"},
  {name: "Panama", code: "PA"},
  {name: "Papua New Guinea", code: "PG"},
  {name: "Paraguay", code: "PY"},
  {name: "Peru", code: "PE"},
  {name: "Philippines", code: "PH"},
  {name: "Pitcairn", code: "PN"},
  {name: "Poland", code: "PL"},
  {name: "Portugal", code: "PT"},
  {name: "Puerto Rico", code: "PR"},
  {name: "Qatar", code: "QA"},
  {name: "Reunion", code: "RE"},
  {name: "Romania", code: "RO"},
  {name: "Russian Federation", code: "RU"},
  {name: "RWANDA", code: "RW"},
  {name: "Saint Helena", code: "SH"},
  {name: "Saint Kitts and Nevis", code: "KN"},
  {name: "Saint Lucia", code: "LC"},
  {name: "Saint Pierre and Miquelon", code: "PM"},
  {name: "Saint Vincent and the Grenadines", code: "VC"},
  {name: "Samoa", code: "WS"},
  {name: "San Marino", code: "SM"},
  {name: "Sao Tome and Principe", code: "ST"},
  {name: "Saudi Arabia", code: "SA"},
  {name: "Senegal", code: "SN"},
  {name: "Serbia", code: "RS"},
  {name: "Seychelles", code: "SC"},
  {name: "Sierra Leone", code: "SL"},
  {name: "Singapore", code: "SG"},
  {name: "Slovakia", code: "SK"},
  {name: "Slovenia", code: "SI"},
  {name: "Solomon Islands", code: "SB"},
  {name: "Somalia", code: "SO"},
  {name: "South Africa", code: "ZA"},
  {name: "South Georgia and the South Sandwich Islands", code: "GS"},
  {name: "Spain", code: "ES"},
  {name: "Sri Lanka", code: "LK"},
  {name: "Sudan", code: "SD"},
  {name: "Suriname", code: "SR"},
  {name: "Svalbard and Jan Mayen", code: "SJ"},
  {name: "Swaziland", code: "SZ"},
  {name: "Sweden", code: "SE"},
  {name: "Switzerland", code: "CH"},
  {name: "Syrian Arab Republic", code: "SY"},
  {name: "Taiwan, Province of China", code: "TW"},
  {name: "Tajikistan", code: "TJ"},
  {name: "Tanzania, United Republic of", code: "TZ"},
  {name: "Thailand", code: "TH"},
  {name: "Timor-Leste", code: "TL"},
  {name: "Togo", code: "TG"},
  {name: "Tokelau", code: "TK"},
  {name: "Tonga", code: "TO"},
  {name: "Trinidad and Tobago", code: "TT"},
  {name: "Tunisia", code: "TN"},
  {name: "Turkey", code: "TR"},
  {name: "Turkmenistan", code: "TM"},
  {name: "Turks and Caicos Islands", code: "TC"},
  {name: "Tuvalu", code: "TV"},
  {name: "Uganda", code: "UG"},
  {name: "Ukraine", code: "UA"},
  {name: "United Arab Emirates", code: "AE"},
  {name: "United Kingdom", code: "GB"},
  {name: "United States", code: "US"},
  {name: "United States Minor Outlying Islands", code: "UM"},
  {name: "Uruguay", code: "UY"},
  {name: "Uzbekistan", code: "UZ"},
  {name: "Vanuatu", code: "VU"},
  {name: "Venezuela", code: "VE"},
  {name: "Viet Nam", code: "VN"},
  {name: "Virgin Islands, British", code: "VG"},
  {name: "Virgin Islands, U.S.", code: "VI"},
  {name: "Wallis and Futuna", code: "WF"},
  {name: "Western Sahara", code: "EH"},
  {name: "Yemen", code: "YE"},
  {name: "Zambia", code: "ZM"},
  {name: "Zimbabwe", code: "ZW"}
];

function convertToMoneyFormat(value) {
  if (!value)
    return "";

  return new Intl.NumberFormat("mn-MN", {
    style: "currency",
    currency: "MNT"
  }).format(value);
}

const reportDataType = {
  AMOUNT: {code: "AMOUNT", name: "Тоон дүн"},
  TEXT: {code: "TEXT", name: "Текст"},
  TEXT_AREA: {code: "TEXT_AREA", name: "Их текст"},
  LICENSE: {code: "LICENSE", name: "Тусгай зөвшөөрөл"},
  SOFTWARE: {code: "SOFTWARE", name: "Программ хангамжийн байгууллага"}
};

const reportDrawType = {
  INPUT: {
    code: "INPUT",
    name: "Утга оруулах",
    dataTypes: [
      reportDataType.AMOUNT,
      reportDataType.TEXT,
      reportDataType.TEXT_AREA,
      reportDataType.LICENSE,
      reportDataType.SOFTWARE
    ]
  },
  STATIC_TEXT: {
    code: "STATIC_TEXT",
    name: "Тогтмол текст",
    dataTypes: [reportDataType.TEXT]
  }
};

const reportFormType = {
  FORM: {code: "FORM", name: "Үндсэн"},
  WITH_CHILD: {code: "WITH_CHILD", name: "Тодруулга /Дэд бүлэгтэй/"},
  // FORM_WITH_ROWSUM: {
  //   code: "FORM_WITH_ROWSUM",
  //   name: "Мөрийн нийлбэр тооцох тайлан",
  // },
  // FORM_WITH_COLSUM: {
  //   code: "FORM_WITH_COLSUM",
  //   name: "Баганын нийлбэр тооцох тайлан",
  // },
  INPUT: {code: "INPUT", name: "Утга оруулах"},
  FORM_VERTICAL_AUTO: {
    code: "FORM_VERTICAL_AUTO",
    name: "Тайлан дэд төрлөөр мөрлүү - автоматаар зурагдах"
  },
  FORM_HORIZONTAL_AUTO: {
    code: "FORM_HORIZONTAL_AUTO",
    name: "Дүнгийн төрлөөр мөрлүү - автоматаар зурагдах"
  }
};

const reportDataUserOrgStatus = {
  DEFAULT: {
    id: 1,
    name: "Анхны төлөв",
    color: "lime",
    description: "Тайлангийн тохиргоо хийнэ үү",
    sendButtonName: "Тайлан илгээх",
    jumpUrl: ""
  },
  AAN_ERROR: {
    id: 2,
    name: "Байгууллагын тохиргоо дутуу",
    color: "orange",
    description: "Байгууллагын тохиргоо дутуу байна",
    icon: <WarningOutlined />,
    sendButtonName: "Тохиргоо дутуу байна",
    jumpUrl: "/orgInfo"
  },
  PACKAGE_ERROR: {
    id: 3,
    name: "Багцын төрөл олдоогүй",
    color: "volcano",
    description: "Тухайн байгууллагад тохирох багцын төрөл олдоогүй",
    icon: <WarningOutlined />,
    sendButtonName: "Багцын төрөл олдоогүй",
    jumpUrl: ""
  },
  PERIOD_PACKAGE_MAP_TYPE_INACTIVE: {
    id: 4,
    name: "Тайлант үед хамрагдаагүй",
    color: "volcano",
    description:
      "Тухайн байгууллагад тохирох багцын төрөл идэвхигүй байгаа тул тайлант үед хамрагдаагүй",
    icon: <WarningOutlined />,
    sendButtonName: "Багцын төрөл идэвхигүй",
    jumpUrl: ""
  },
  CONFIG_CONFIRMED: {
    id: 5,
    name: "Тохиргоо баталгаажсан",
    color: "cyan",
    buttonColor: "blue",
    description: "Тохиргоо баталгаажсан тайлан шивхэд бэлэн",
    icon: <SettingOutlined />,
    sendButtonName: "Тайлан шивж эхлээгүй",
    jumpUrl: ""
  },
  REPORT_PROCESSING: {
    id: 6,
    name: "Тайлан шивэгдэж буй",
    color: "processing",
    description: "Тайлан шивэгдэж буй",
    icon: <FormOutlined />,
    sendButtonName: "Тайлан шивэгдэж буй",
    jumpUrl: ""
  },
  REPORT_CONFIRMED: {
    id: 7,
    name: "Тайлан баталгаажсан",
    color: "success",
    description: "Баталгаажсан тайлан",
    icon: <CheckCircleOutlined />,
    sendButtonName: "Баталгаажсан",
    jumpUrl: ""
  }
};

const renderDate = (date) => {
  if (date) {
    return moment(date).format("yyyy-MM-DD HH:mm:ss");
  }
  return null;
};

const cellType = {
  WITH_CELL_WITH_PROP: "WITH_CELL_WITH_PROP",
  WITH_CELL_NO_PROP: "WITH_CELL_NO_PROP",
  NO_CELL_WITH_PROP: "NO_CELL_WITH_PROP",
  NO_CELL_NO_PROP: "NO_CELL_NO_PROP"
};

const reportPeriodMapStatus = {
  CREATED: {
    id: 0,
    name: "Үүсгэсэн",
    color: "default"
  },
  ACTIVE: {
    id: 1,
    name: "Идэвхтэй",
    color: "green"
  },
  REPORT_WRITING: {
    id: 2,
    name: "Тайлант үе нээлттэй",
    color: "success",
    icon: <CheckCircleOutlined />
  },
  REPORT_END: {
    id: 3,
    name: "Тайлан шивэх хугацаа дууссан",
    color: "gold",
    icon: <ClockCircleOutlined />
  },
  FINISH: {
    id: 4,
    name: "Тайлант үе хаагдсан",
    color: "error",
    icon: <CloseCircleOutlined />
  }
};
const reportDataHdrStatusOb = {
  CREATED: {
    id: 0,
    name: "Тайлан шивж эхлэх",
    name2: "Тайлан шивж эхлэх",
    icon: <EditOutlined />,
    icon2: <EditOutlined style={{color: "#874d00"}} />,
    color: "default",
    color2: "#facd32"
  },
  WRITING: {
    id: 1,
    name: "Тайлан шивж эхэлсэн",
    name2: "Тайлан шивж буй",
    icon: <FormOutlined />,
    icon2: <FormOutlined style={{color: "#f35e06"}} />,
    color: "cyan",
    color2: "#f88036"
  },
  SENT: {
    id: 2,
    name: "Хүлээгдэж буй",
    name2: "Илгээсэн",
    icon: <SyncOutlined />,
    icon2: <SyncOutlined style={{color: "#2279cc"}} />,
    color: "processing",
    color2: "#69c0ff"
  },
  PROCESSING: {
    id: 3,
    name: "Хянагдаж буй",
    name2: "Хянагдаж буй",
    icon: <FileSearchOutlined />,
    icon2: <FileSearchOutlined style={{color: "#011098"}} />,
    color: "processing",
    color2: "#1890ff"
  },
  RETURNED: {
    id: 4,
    name: "Буцаагдсан",
    name2: "Буцаагдсан",
    icon: <UndoOutlined />,
    icon2: <UndoOutlined style={{color: "orange"}} />,
    color: "warning",
    color2: "orange"
  },
  RETURNED_TO_AUD: {
    id: 5,
    name: "Аудит руу буцаасан",
    name2: "Аудит руу буцаасан",
    icon: <AuditOutlined />,
    icon2: <AuditOutlined style={{color: "#a071ff"}} />,
    color: "magenta",
    color2: "#a071ff"
  },
  CANCELED: {
    id: 6,
    name: "Цуцлагдсан",
    name2: "Цуцлагдсан",
    icon: <CloseCircleOutlined />,
    icon2: <CloseCircleOutlined style={{color: "#f5222d"}} />,
    color: "red",
    color2: "#f5222d"
  },
  CONFIRMED: {
    id: 7,
    name: "Баталгаажсан",
    name2: "Баталгаажсан",
    icon: <CheckCircleOutlined />,
    icon2: <CheckCircleOutlined style={{color: "#078f10"}} />,
    color: "success",
    color2: "#078f10"
  }
};

const orgReportStatus = [
  {id: 0, name: "Хүсэлт үүсгэсэн", code: "PROCESSING", color: "processing"},
  {id: 1, name: "Хүсэлт илгээсэн", code: "SENT", color: "#2db7f5"},
  {id: 2, name: "Баталгаажсан", code: "CONFIRMED", color: "success"},
  {id: 3, name: "Буцаагдсан", code: "RETURNED", color: "warning"}
];

const reportUserOrgStatus = {
  CREATED: {
    id: 1,
    name: "Тайлант үетэй холбогдсон",
    code: "CREATED",
    color: "#2db7f5",
    actionName: "Тайлант үетэй холбогдсон"
  },
  PROGRESSING: {
    id: 2,
    name: "Тайлан шивж байна",
    code: "PROGRESSING",
    color: "processing",
    actionName: "Шивэлт эхлүүлсэн"
  },
  CANCELED: {id: 3, name: "Цуцалсан", code: "CANCELED", color: "warning", actionName: "Цуцлагдсан"},
  CONFIRMED: {id: 4, name: "Баталгаажсан", code: "CONFIRMED", color: "success", actionName: "Баталгаажуулсан"},
  CONNECT_REQUEST_SENT: {
    id: 5,
    name: "Холбох хүсэлт илгээсэн",
    code: "CONNECT_REQUEST_SENT",
    color: "purple",
    actionName: "Хүсэлт илгээсэн"
  },
  CONNECT_REQUEST_RETURNED: {
    id: 6,
    name: "Холбох хүсэлт цуцлагдсан",
    code: "CONNECT_REQUEST_RETURNED",
    color: "red",
    actionName: "Цуцлагдсан"
  }
};

const userOrgReportStatus = {
  PROCESSING: {
    id: 1,
    name: "Бөглөж байгаа",
    name2: "Хүсэлт үүсгэсэн",
    code: "PROCESSING",
    icon: <SyncOutlined spin />,
    color: "processing",
    color2: "#1890ff"
  },
  SENT: {
    id: 2,
    name: "Хүсэлт илгээсэн",
    name2: "Хүсэлт илгээсэн",
    code: "SENT",
    icon: <SendOutlined />,
    color: "#2db7f5",
    color2: "#69c0ff"
  },
  CONFIRMED: {
    id: 3,
    name: "Баталгаажсан",
    name2: "Баталгаажсан",
    code: "CONFIRMED",
    icon: <CheckCircleOutlined />,
    color: "success",
    color2: "#078f10"
  },
  RETURNED: {
    id: 4,
    name: "Буцаагдсан",
    name2: "Буцаагдсан",
    code: "RETURNED",
    icon: <UndoOutlined />,
    color: "warning",
    color2: "orange"
  }
};

const userOrgRelationStatus = {
  PROCESSING: {
    code: 1,
    name: "Хүлээгдэж байна",
    icon: <SyncOutlined spin />,
    color: "processing"
  },
  CONFIRMED: {
    code: 2,
    name: "Баталгаажсан",
    icon: <CheckCircleOutlined />,
    color: "success"
  },
  RETURNED: {
    code: 3,
    name: "Буцаагдсан",
    icon: <UndoOutlined />,
    color: "warning"
  }
};

const periodType = {
  SEASON: {
    code: "Q",
    name: "Улирал",
    name1: "-р улирал",
    name2: "-Р УЛИРАЛЫН"
  },
  MONTH: {
    code: "M",
    name: "Сар",
    name1: "-р сар",
    name2: "-Р САРЫН"
  },
  HALF: {
    code: "H",
    name: "Хагас",
    name1: "-р хагас",
    name2: "-Р ХАГАСЫН"
  },
  YEAR: {
    code: "Y",
    name: "Он",
    name1: "он",
    name2: "ОНЫ"
  },
};

const actionType = {
  NOT_LOGGED_IN: {
    code: 0,
    name: "Системд нэвтрээгүй хэрэглэгч",
    color: "red",
  },
  NO_ACCESS: {
    code: 1,
    name: "Хэрэглэгчийн эрхгүй",
    color: "warning",
  },
  ACCESS: {
    code: 2,
    name: "Хэрэглэгчийн эрхтэй",
    color: "processing",
  },
};

const secondsToHms = (d) => {
  if (!(d > 0)) return "";
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h : "00";
  var mDisplay = m > 0 ? m : "00";
  var sDisplay = s > 0 ? s : "00";
  return hDisplay + ":" + mDisplay + ":" + sDisplay;
};
const reportPackageFormMapType = {
  System: {type: 1, name: "Систем"},
  Package: {type: 2, name: "Багц"},
  PackageMap: {type: 3, name: "Маягтын бүтэц"},
  ReportForm: {type: 4, name: "Тайлангийн маягт"}
};


// ================================================================= NEW =============================================
const reportUserOrgHdrStatus = {
  CREATED: {code: 0, name: "Үүсгэсэн", color: "default", icon: null},
  WRITING: {code: 1, name: "Шивж буй", color: "orange", icon: null},
  SENT: {code: 2, name: "Илгээсэн", color: "#13c2c2", icon: null},
  PROCESSING: {code: 3, name: "Шийдвэрлэж буй", color: "processing", icon: null},
  RETURNED: {code: 4, name: "Буцаагдсан", color: "warning", icon: null},
  RETURNED_TO_AUD: {code: 5, name: "Аудитруу буцаагдсан", color: "purple", icon: null},
  CANCELED: {code: 6, name: "Цуцлагдсан", color: "error", icon: null},
  CONFIRMED: {code: 7, name: "Баталгаажсан", color: "success", icon: null},
  CHANGE_PROCESSING_USER: {code: 8, name: "Шийдвэрлэж буй хүн солигдсон", color: "cyan", icon: null},
  FIX_REQUEST_SEND: {code: 9, name: "Засварын хүсэлт илгээсэн", color: "magenta", icon: null},
  FIX_REQUEST_CANCELED: {code: 10, name: "Засварын хүсэлт цуцлагдсан", color: "red", icon: null},

  VALIDATING: {code: 20, name: "Шалгагдаж буй", color: "geekblue", icon: <LoadingOutlined />},
  REPORT_VIEW: {code: 21, name: "Тайлан харсан", color: "gold"}
};
const reportHdrType = {
  USER_ORG_MAIN: 1,
  AUDIT_ORG_FIX: 2,
  USER_ORG_FIX: 3
};

const optionPermissions = {
  ReportWritingType: {
    code: "ReportWritingType",
    name: "Тайлангийн төрөл",
    tagColor: "blue",
    icon: <ContainerOutlined />,
    iconLarge: <ContainerOutlined style={{fontSize: "large", fontWeight: "bold"}} />
  },
  OrgTypeMap: {
    code: "OrgTypeMap",
    name: "Байгууллагийн өмчийн хэлбэр",
    tagColor: "volcano",
    icon: <BankOutlined />,
    iconLarge: <BankOutlined style={{fontSize: "large", fontWeight: "bold"}} />
  },
  ParentOrg: {
    code: "ParentOrg",
    name: "Толгой компани",
    tagColor: "gold",
    icon: <ApartmentOutlined />,
    iconLarge: <ApartmentOutlined style={{fontSize: "large", fontWeight: "bold"}} />
  },
  LargeOrg: {
    code: "LargeOrg",
    name: "Нийтийн ашиг сонирхолын байгууллага",
    tagColor: "magenta",
    icon: <FundViewOutlined />,
    iconLarge: <FundViewOutlined style={{fontSize: "large", fontWeight: "bold"}} />
  },
  License: {
    code: "License",
    name: "Тусгай зөвшөөрөл",
    tagColor: "purple",
    icon: <FileProtectOutlined />,
    iconLarge: <FileProtectOutlined style={{fontSize: "large", fontWeight: "bold"}} />
  }
};

const registerStatus = {
  UNKNOWN: "UNKNOWN",
  REGISTERED: "REGISTERED"
};

const getWindowHeightByPercent = (percent) => {
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
};

const renderOrganizationName = (organization) => {
  if (!organization)
    return "";
  return organization?.name + " " + organization?.description + " " + organization?.regNo;
};
const getReportDataKey = (propertyId, isOld, cellId, rowOrder, cellOrder) => {
  if (propertyId > 0) {
    if (!isOld)
      return `${propertyId}`
    return `old_${propertyId}`
  }
  return `${cellId}_${rowOrder}_${cellOrder}`
};

export {
  getReportDataKey,
  renderOrganizationName,
  registerStatus,
  optionPermissions,
  reportUserOrgStatus,
  dateFormat,
  reportPackageFormMapType,
  renderDate,
  secondsToHms,
  countryList,
  successMsg,
  activeStatus,
  convertToMoneyFormat,
  getActiveStatusTag,
  roleTypeStatus,
  reportDrawType,
  reportDataType,
  userOrgRelationStatus,
  expressionType,
  reportFormType,
  cellType,
  showErrorMsg,
  getErrorMsg,
  getExceptionObj,
  getResultFromResponse,
  encryptValue,
  decryptValue,
  perRoleType,
  reportDataUserOrgStatus,
  newsType,
  newsCategoryTypes,
  newsTypeArray,
  reportPeriodMapStatus,
  orgReportStatus,
  reportDataHdrStatusOb,
  reportHdrType,
  perMapUserRoleStatus,
  userOrgReportStatus,
  periodType,
  actionType,


  // ======================================== new ==========================================
  reportUserOrgHdrStatus,
  perMapUserRoleActionStatus,
  getWindowHeightByPercent,
  reportReportWritingConfigType
};
