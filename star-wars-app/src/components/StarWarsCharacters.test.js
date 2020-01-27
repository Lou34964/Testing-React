import React from 'react';
import {render, fireEvent, wait, findAllByTestId} from '@testing-library/react';
import StarWarsCharacters from "./StarWarsCharacters";
import {getData as mockGetData} from '../api';
import "@testing-library/jest-dom";

jest.mock("../api")

// test("app renders without crashing", () =>{
//   render(<StarWarsCharacters/>);
// })

// test ('buttoms render to dom', () =>{
//   const {getByText} = render(<StarWarsCharacters/>);

//   getByText(/next/i);
//   getByText(/previous/i);
// })

test('buttons fire and and call correct functions', async () =>{
  mockGetData.mockResolvedValueOnce(
    {results: [{
      name: ""
    }],
    next:"abcd",
    previous:"now"

    }
  );
  const {getByText} = render(<StarWarsCharacters/>);
  const nextButton = getByText(/next/i);
  const prevButton = getByText(/previous/i);

  fireEvent.click(nextButton);
  fireEvent.click(prevButton);
  expect(mockGetData).toHaveBeenCalledTimes(1);

  wait(() => expect(getByText(/'Darth'/i)).toBeInDocument());
})