import React from 'react'
import styled from 'styled-components'
// import cn from 'classnames';
import {withGlobalContextProvider} from './context';
// import {Loader} from '@components/icons';
// import Footer from '@components/Footer';
// import Welcome from '@pages/Welcome';
// import Selector from '@pages/Selector';
// import Settings from '@pages/Settings';
// import Support from '@pages/Support';
// import {getSelectedPagedFrames, optionsToContents} from '@utils/frames';

const Container = styled.div`
  display: flex;
`

interface Props {
  globalData: any;
  changeGlobalData: (property, value) => void;
  initializeGlobalData: (data) => void;
}

const App = function (props: Props) {
  console.log(props)
  return (
    <Container>
      欢迎使用
    </Container>
  )
}

export default withGlobalContextProvider(App);
