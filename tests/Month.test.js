/*
  Simple example test for a database
*/



// import all required modules
import React from 'react';
import renderer from 'react-test-renderer';
import Month from '../client/src/components/Month';


// define test
test('Month loads a snapshot', () => {
  const component = renderer.create(
    <Month date={'06/20/2020'} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

/* when the above function is ran, Jest creates a 'snapshot file' that will look something like:
      <a
        className='SOMETHING'
        EXAMPLE_FUNCTION={[Function]}
      >

    when jest is ran again, it will create a new snapshot and compare the new with the previous. If the comparison is true, the test will pass.

    if you augment the test afterwards be sure to run 'jest --updateSnapshot' so the tests aren't comparing older tests to your updated one
*/