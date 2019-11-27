# Kanban Board

This PR adds a Kanban board page that meets the following ui/ux requirements:

- The layout/design matches the [Figma spec](https://www.figma.com/file/tAz0AHV0d4eiUPV0ExihW6/Close-Take-Home)
  .
- There must be three columns:
  - To do
  - In progress
  - Done
- Each column may contain N cards (maximum of 100).
- Each card must show a [Gravatar](https://en.gravatar.com/site/implement/images/), a title, and a description.
- The user can drag the card around (drag within a column to re-order or move it to another column).
- The user can add a new card by clicking `+` on any of the columns.
- The board must take the entire height of the available screen (respecting the spacing around it).
- Each column must be scrollable, although its header must remain fixed.
- The changes must be persisted after a refresh (only locally).
- In case the board is open in two different tabs: whenever something changes on one tab, the others must be updated.

The resulting UI:

![UI](https://i.imgur.com/UFNRYCJ.png)

### Column Interactions

![UI Column Interactions](https://i.imgur.com/XJugGQm.gif)

### Drag Between Columns

![UI Drag Between Columns](https://i.imgur.com/ZCoaZhf.gif)

### Syncing across tabs/windows

![UI Sync](https://i.imgur.com/UJ61WR1.gif)

#### Git

The git history codifies my thoughts and technical decisions in an attempt to tell the why behind the what. There are a few instances where I have fixup commits that I normally would rebase, but I wanted to show my process.

#### Repository Structure

The structure of the repository was largely kept the same from the assignment structure. I am not a fan of the resulting structure of the repository, I prefer a more flat component structure with reusable components developed in isolation (with storybook) that are then plugged into pages. I left the decision to use css modules, I think I would normally prefer a utility library like tailwind, or css-in-js to css-modules, but I am comfortable with any method of styling.

#### Technical Decisions

The bulk of the logic for holding state is represented in a BoardProvider component that can pass state to components that need it. This is where the localStorage syncing problem is solved through the use-persisted-state library. I chose to expose a simpler api, addCard and moveCard for the components to utilize. The actual code within addCard and moveCard is a bit messy and could be factored better. The state is normalized by columns and cards in a hashmap based on their id. This provides fast lookups for drag and drop movement and reordering.

A number of libraries were used to help complete this feature:

- shortid to generate unique ids for new cards
- react-beautiful-dnd to provide the drag and drop experience mostly out of the box
- gravatar-url to run the md5 hashing on emails to generate gravatar urls of emails
- use-persisted-state to handle the syncing between tabs
- formik and yup to handle form validation

#### Testing

Tests for the main logic in Board Provider were added, along with tests for adding new cards, opening and closing the card form, and testing that cards in other columns do not rerender when a new card is added. The test to ensure rerenders don't occur is somewhat janky, it relies on console.log in the test environment to tell if a component rerenders. After submitting the form we check a mocked version of the log to ensure we dont see logs for components in other columns. There is not a lot of literature that I could find on testing that memoization is working properly, and it goes against react testing library's philosophy of testing user interactions and not implementation details. That said, I felt this was a point that was stressed and it -is- useful to know if a change breaks memoization.

#### Looking Forward

There are a number of things I would do given more time and a team to collaborate. I believe the UX of dragging could be better, potentially showing shadows before dropping. The plus button could use some animation or transition to indicate it is clickable. It also might be nice to animate the form coming in so the transition is not so abrupt. Throughout the app if this moved to be a server model we would need to concern ourselves with loading states, skeleton ui, etc. to create a great experience.

Overall I am happy with the codebase. There are opportunities for better factoring, and in my ideal situation this would be written in TypeScript to gain extra type safety and aid in maintenance down the road. I would also want to add end-to-end tests using Cypress to more fully test the drag and drop interactions that can't be easily mocked with JSDOM.
