// /*
//   Simple example test for a database
// */



// // import all required modules
// import React from 'react';
// import renderer from 'react-test-renderer';
// import FILL_ME_IN from 'FILL_ME_IN';


// // define test
// test('FILL_ME_IN does X when Y', () => {
//   const component = renderer.creat(
//     <FILL_ME_IN props={FILL_ME_IN} />
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger an event in the module
//   tree.props.EXAMPLE_FUNCTION();
//   // re-render the component to check for changes
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// })

// /* when the above function is ran, Jest creates a 'snapshot file' that will look something like:
//       <a
//         className='SOMETHING'
//         EXAMPLE_FUNCTION={[Function]}
//       >

//     when jest is ran again, it will create a new snapshot and compare the new with the previous. If the comparison is true, the test will pass.

//     if you augment the test afterwards be sure to run 'jest --updateSnapshot' so the tests aren't comparing older tests to your updated one
// */