import React from 'react';
import NoSSR from 'react-no-ssr'
import {
  AppCardView,
  AppCardModel,
  AppCardDetails,
  AppCardBadge,
  AppCardLozenge,
  AppCardContext,
  AppCardAction,
  AppCardUser,
} from '@atlaskit/media-card';

const Loading = () => (<div>Loading...</div>);
const handleActionWithLoadingStatesClick = (a, handlers) => {
  console.log('clicked on the action', a.title, a);
  handlers.progress();
  switch (a.target.key) {
    case 'success':
      setTimeout(() => {
        handlers.success('Yey. It works.');
      }, 2000);
      break;
    case 'failure':
      setTimeout(() => {
        handlers.failure('There is a glitch.');
      }, 2000);
      break;
    case 'loading':
      setTimeout(() => {
        handlers.success();
      }, 2000);
      break;
    case 'failure-with-retry':
      setTimeout(() => {
        handlers.failure('Some error', true, 'Try again btn text');
      }, 2000);
      break;
  }
};
const mostOfTheThingsWithPreview = {
  title: { text: '당신을 바라보는 건 너무 힘들어!' },
  description: { text: '톱스타 연의 매니저 알바를 하게 된 평범한 체대생 강태호. 원래 로드 매니저에게 이렇게 돈을 많이 주는 건가?! 이 일, 저 사람에게 뭔가 비밀이 있는 것 같은데…인기 절정 연예인과 무덤덤한 매니저의 의외의 케미!' },
  details: [
    { title: '장르', lozenge: {
        text: 'BL',
        appearance: 'inprogress',
      }
    },
    { title: '작가', text: '팀 만나' },
    { badge: {
        value: 101,
        max: 99,
        appearance: 'important',
      }
    },
  ],
  context: {
    text: '1위',
    icon: { url: 'http://dryicons.com/uploads/icon/svg/6435/592325b4-2fe1-401e-995e-cc4a8aa22f79.svg', label: 'foobar' },
  },
  actions: [
    {
      title: '작품보기',
      target: {
        receiver: 'some.receiver2',
        key: 'success',
      },
      parameters: {
        expenseId: 'some-id2',
      },
    }
  ],
  preview: {
    url: 'https://cdn.lezhin.com/v2/comics/260/images/square?updated=1515034821866&width=600',
  },

};

const CARD = () => (
  <div>
    <NoSSR onSSR={<Loading />}>
      <>
        <AppCardView newDesign={true} model={mostOfTheThingsWithPreview} onActionClick={handleActionWithLoadingStatesClick} />
        <AppCardView newDesign={true} model={mostOfTheThingsWithPreview} onActionClick={handleActionWithLoadingStatesClick} />
      </>
    </NoSSR>
  </div>
)

export default CARD
