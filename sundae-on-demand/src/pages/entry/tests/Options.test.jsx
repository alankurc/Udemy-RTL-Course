import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("Displays image for each scoop from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scroopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scroopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scroopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
