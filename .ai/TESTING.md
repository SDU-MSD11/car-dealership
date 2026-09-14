# CRITICAL: Always maintain tests

When a new change is made anywhere in the `./src/` folder, check if said file / path location, has a test made according in the `./__tests__/` folder.

If the file doesn't exist:
- Make the jest testing file for that specific changed file.

If it does exist:
- Check if the new behavior changes anything that makes it necessary to change the test itself.

For example if a file located at `./src/features/inventory/components/CarList.tsx`, then it should make the test at `./__tests__/features/inventory/components/CarList.test.tsx`.

# CRITICAL: Technology use

The testing uses Jest and @testing-library/react-native, don't use anything else, it is a hard no, and not a suggestion.