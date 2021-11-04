import * as React from 'react';
import i18next from './i18next';
import {i18n as I18n} from 'i18next';

export const I18nLaborContext = React.createContext<I18n>(i18next);
I18nLaborContext.displayName = 'I18nContext';
