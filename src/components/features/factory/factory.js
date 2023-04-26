import APP_COMPONENTS from '@/constants/app-components';
import { Entry } from 'contentful';

import transformField from './transform-field';

const Factory = ({
  component,
  locale,
  page = null,
  menuData = null,
  menuRoute = null
}) => {
  if (component === null) {
    return null;
  }

  const fields = component.fields;
  const contentType = component?.sys?.contentType?.sys?.id;

  // if (contentType === 'tab-item') {
  //   const nenuItems = menuData;

  //   return (
  //     nenuItems
  //     && <>
  //       <MainMenu items={nenuItems} page={page}>
  //         {fields.content?.map((subComponent, index) => {
  //           return (
  //             <Factory key={index} component={subComponent} menuRoute={getSelectedMenuRoute(nenuItems)} locale={locale} page={page}/>
  //           );
  //         })}
  //       </MainMenu>
  //     </>
  //   );
  // }

  const {
    component: Component,
    theme
  } = APP_COMPONENTS[fields.style];

  const { content: componentProps } = Component.defaultProps;

  if (!Component) {
    return null;
  }

  const newContent = {theme: theme};

  if (contentType === 'tab-panel') {
    const tabContanerProps = {
      content: {
        image: transformField('image', fields.image),
        name: fields.name,
        tabs: fields.items?.map((tabData, tabIndex) => {
          return {
            components: tabData.fields?.content?.map((subComponent, componentIndex) => {
              return (
                <Factory key={`${ tabIndex }${ componentIndex }`} component={subComponent} menuRoute={menuRoute} locale={locale} page={page} menuData={menuData} />
              );
            }),
            icon: transformField('icon', tabData.fields?.icon),
            secondaryIcon: transformField('icon', tabData.fields?.secondaryIcon),
            style: tabData.fields?.style,
            title: tabData.fields?.title
          };
        }),
        theme: theme,
        title: fields.title
      },
      locale: { locale },
      menuRoute: menuRoute,
      page: {page}
    };

    return (
      <>
        <Component {...tabContanerProps}></Component>
      </>
    );
  }

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
