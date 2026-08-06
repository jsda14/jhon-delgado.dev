import type { Schema, Struct } from '@strapi/strapi';

export interface SharedMetric extends Struct.ComponentSchema {
  collectionName: 'components_shared_metrics';
  info: {
    displayName: 'Metric';
    icon: 'hashtag';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['default', 'primary', 'warning', 'success', 'purple', 'orange']
    > &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface SharedTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_tags';
  info: {
    displayName: 'Tag';
    icon: 'code';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['default', 'primary', 'warning', 'success', 'purple', 'orange']
    > &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.metric': SharedMetric;
      'shared.tag': SharedTag;
    }
  }
}
