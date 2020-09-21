import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Message from '../src/components/Message/Message';

describe ('Input component', () => {
    test('props date is passed', () => {
        const component = renderer.create(<Message name='Ellie' message='hello' from='me' date='21.12.99' />);
        const root = component.root;
        expect(root.props.date).toBe('21.12.99');
    });
});
