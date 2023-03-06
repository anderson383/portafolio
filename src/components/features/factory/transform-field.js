import { INLINES, BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import HTMLParser from 'node-html-parser';

const RICH_TEXT_CONTENT_TYPE = 'document';
const ASSET = 'Asset';

const makeDocumentObject = nodesArray => {
  return {
    content: nodesArray,
    data: {},
    nodeType: 'document'
  };
};

const richTextRenderOptions = { renderNode:
  { [INLINES.HYPERLINK]: (node, children) => {
    const uri = node.data.uri;

    if (uri.startsWith('http')) {
      return `<a class="link-2" href="${ uri }" target="_blank" rel="noopener noreferrer">${ documentToHtmlString(node) }</a>`;
    }

    return `<a class="link-2" href="${ uri }">${ documentToHtmlString(node) }</a>`;
  },
  [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
    const assetFields = node.data.target.fields;

    if (assetFields.file.contentType.includes('image')) {
      return `<img src="https:${ assetFields.file.url }" alt="${ assetFields.title }" />`;
    }
  }
}};

const transformFieldsObject = fields => {
  const newFields = {};

  if (fields) {
    Object.keys(fields).forEach(fieldName => {
      newFields[fieldName] = transformField(fieldName, fields[fieldName]);
    });
  }

  return newFields;
};

const transformField = (fieldName, fieldValue) => {
  // Transforma objetos especiales de contentful a props del componente.

  // Si es un rich text lo convierte en html.
  if (fieldValue?.nodeType === RICH_TEXT_CONTENT_TYPE) {
    const htmlText = documentToHtmlString(fieldValue, richTextRenderOptions);

    // logica de tratamiento de link
    // Si el nombre del campo es link se interpreta como link.
    if (typeof fieldName === 'string' && fieldName.includes('link')) {
      const root = HTMLParser.parse(htmlText);

      return root.firstChild.innerHTML;
    }

    return htmlText;
  }

  // Si es un asset lo convierte en url.
  if (fieldValue?.sys?.type === ASSET) {
    return {
      contentType1: fieldValue.fields.file.contentType,
      description: fieldValue.fields.description,
      fileName: fieldValue.fields.file.fileName,
      title: fieldValue.fields.title,
      url: fieldValue.fields.file.url
    };
  }

  // Si es un array lo convierte en un array de strings.
  if (Array.isArray(fieldValue)) {
    return fieldValue.map(item => {
      return transformFieldsObject(item.fields);
    });
  }

  return fieldValue;
};

export default transformField;
