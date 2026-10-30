const AUDIT_DATES={'2026-10-27':{label:'10月27日',data:AUDIT_20261027,wipeCalledFightIds:[14]},'2026-10-29':{label:'10月29日',data:AUDIT_20261029,wipeCalledFightIds:[]}};
const requestedDate=new URL(location.href).searchParams.get('date');
const AUDIT_DATE=Object.hasOwn(AUDIT_DATES,requestedDate)?requestedDate:'2026-10-29';
const DATA={...AUDIT_DATES[AUDIT_DATE].data,aliases:{},wipeCalledFightIds:AUDIT_DATES[AUDIT_DATE].wipeCalledFightIds};
