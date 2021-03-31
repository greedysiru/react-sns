import React from 'react';

// 최소 단위 컴포넌트
import Grid from '../elements/Grid'

// 알림뱃지 가져오기
import { Badge } from '@material-ui/core';
import { FiBell } from "react-icons/fi";
// 파이어베이스 리얼타임 데이터베이스
import { realtime } from '../shared/firebase';

// 리덕스
import { useSelector } from 'react-redux';

// 알림뱃지
const NotiBadge = (props) => {
  // 읽었는지 안 읽었는지 여부
  const [is_read, setIsRead] = React.useState(true);
  const user_id = useSelector(state => state.user.user.uid);

  // 알림체크
  const notiCheck = () => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    // 읽음으로 표시
    notiDB.update({ read: true })
    props._onClick()
  }

  React.useEffect(() => {
    const notiDB = realtime.ref(`noti/${user_id}`);

    notiDB.on('value', (snapshot) => {
      setIsRead(snapshot.val().read);
    });

    return () => notiDB.off();

  }, [])

  return (
    <React.Fragment>
      <Grid>
        <Badge color="secondary" variant="dot" invisible={is_read} onClick={notiCheck}>
          <FiBell />
        </Badge>
      </Grid>
    </React.Fragment>
  )
}

NotiBadge.defaultPorps = {
  _onClick: () => { },

}

export default NotiBadge;