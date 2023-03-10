import APP_COMPONENTS from '@/constants/app-components';
import { Entry } from 'contentful';

import transformField from './transform-field';

const Factory = ({
  component,
  locale,
  page = null
}) => {
  if (component === null) {
    return null;
  }

  const fields = component.fields;

  const {
    component: Component,
    theme
  } = APP_COMPONENTS[fields.style];

  const { content: componentProps } = Component.defaultProps;

  if (!Component) {
    return null;
  }

  const newContent = {theme: theme};

  Object.getOwnPropertyNames(componentProps).forEach(property => {
    if (fields[property] && property !== 'style') {
      newContent[property] = transformField(property, fields[property]);
    }
  });

  return (
    <>
      <Component content={newContent} locale={locale} page={page}></Component>
    </>
  );
};

export default Factory;
