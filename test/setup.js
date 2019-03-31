/**
 * Provides enzyme config and localStorage to all modules
 */

import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { LocalStorageMock } from './localStorage';

// Setup enzyme's react adapter
configure({ adapter: new EnzymeAdapter() });
global.localStorage = new LocalStorageMock();
