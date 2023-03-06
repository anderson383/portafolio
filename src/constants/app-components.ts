import Banner from '@/components/features/banner/';

interface AppComponents {
  [name:string]: {
    component: {
      (): JSX.Element;
      defaultProps: {
        content: {
          [name: string]: {}
        },
        locale: string
        page: string
      }
    },
    theme: string
  }
}

const APP_COMPONENTS: AppComponents = {
  'main-banner': {
    component: Banner,
    theme: 'default'
  },
  '': {
    component: Banner,
    theme: ''
  }
};

export default APP_COMPONENTS;
