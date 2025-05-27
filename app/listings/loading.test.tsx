import { render, screen } from "@testing-library/react"
import ListingsLoading from "./loading"

describe("ListingsLoading", () => {
  it("renders the loading skeleton components", () => {
    render(<ListingsLoading />)

    // Check for container elements
    expect(screen.getByTestId("listings-loading-container")).toBeInTheDocument()

    // Check for filter skeletons
    expect(screen.getAllByTestId("filter-skeleton")).toHaveLength(5)

    // Check for listing skeletons
    expect(screen.getAllByTestId("listing-skeleton")).toHaveLength(6)
  })

  it("matches snapshot", () => {
    const { container } = render(<ListingsLoading />)
    expect(container).toMatchSnapshot()
  })
})
