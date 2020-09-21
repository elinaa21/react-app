import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Search from '../src/components/Search/Search';

it('SubjectToBeTested renders correctly', () => {
  const tree = renderer
    .create(<Search />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
