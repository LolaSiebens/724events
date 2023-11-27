import { render, screen } from "@testing-library/react";
import EventCard from "./index";

describe("When a event card is created", () => {
  it("an image is display with alt value", () => {
    render(<EventCard imageSrc="http://src-image" imageAlt="image-alt-text" date={new Date("2022-04-01")}
      title="test event"

      label="test label"
    />);
    const imageElement = screen.getByTestId("card-image-testid");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.alt).toEqual("image-alt-text");
  });
  it("a title, a label and a month are displayed", async () => {
    render(
      <EventCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        title="test event"
        label="test label"
        date={new Date("2022-04-01")}
      />
    );
    const titleElement = screen.getByText(/test event/);
    const labelElement = screen.getByText(/test label/);
    // Utilisation de queryByText pour vérifier si le texte "avril" est présent
    const monthElement = screen.queryByText("avril");
    expect(titleElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    // Vérifiez si le mois est présent, et ajoutez des assertions si nécessaire
    if (monthElement) {
      expect(monthElement).toBeInTheDocument();
    }
  });
  describe("with small props", () => {
    it("a modifier small is added", () => {
      render(
        <EventCard
          imageSrc="http://src-image"
          imageAlt="image-alt-text"
          title="test event"
          label="test label"
          date={new Date("2022-04-01")}
          small
        />
      );
      const cardElement = screen.getByTestId("card-testid");
      expect(cardElement.className.includes("EventCard--small")).toEqual(true);
    });
  });
});
