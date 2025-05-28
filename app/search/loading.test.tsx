import { render, screen } from "@testing-library/react"
import Loading from "./loading"

describe("Search Loading Component", () => {
  it("renders the loading skeleton", () => {
    render(<Loading />)

    // Check for loading elements
    const loadingElements = screen.getAllByTestId("search-loading-skeleton")
    expect(loadingElements.length).toBeGreaterThan(0)
  })

  it("matches snapshot", () => {
    const { container } = render(<Loading />)
    expect(container).toMatchSnapshot()
  })

  it("has accessible loading indicators", () => {
    render(<Loading />)
    const loadingRegion = screen.getByRole("region", { name: /loading/i })
    expect(loadingRegion).toBeInTheDocument()
  })
})
