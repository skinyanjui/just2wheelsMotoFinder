import { render, screen } from "@testing-library/react"
import Loading from "./loading"

describe("Search Loading Component", () => {
  it("renders the loading skeleton", () => {
    render(<Loading />)

    // Check for loading elements
    expect(screen.getByTestId("search-loading-title")).toBeInTheDocument()
    expect(screen.getByTestId("search-loading-input")).toBeInTheDocument()
    expect(screen.getByTestId("search-loading-message")).toBeInTheDocument()
  })

  it("matches snapshot", () => {
    const { container } = render(<Loading />)
    expect(container).toMatchSnapshot()
  })

  it("has accessible loading indicators", () => {
    render(<Loading />)
    const loadingElement = screen.getByRole("status")
    expect(loadingElement).toBeInTheDocument()
    expect(loadingElement).toHaveAttribute("aria-busy", "true")
  })
})
