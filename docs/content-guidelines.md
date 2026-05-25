# Content Guidelines

democrito is IDE-inspired: precise, clear, never decorative. Copy should feel
like it was written by a developer who respects the user's time.

## Voice and tone

- **Precise over friendly.** "Token not found" not "Oops, we couldn't find that!"
- **Sentence case always.** Every label, heading, and CTA. No title case, no all-caps (except data/code values).
- **Action verbs.** Buttons describe what happens, not what exists.
- **Second person.** "Your prompt" not "The prompt." "You can" not "Users can."

## Button labels

Preferred vocabulary for common actions:

| Action | Use | Avoid |
|--------|-----|-------|
| Persist data | Save | Submit, Store, Commit |
| Move forward | Continue | Next, Proceed, Go |
| Move backward | Back | Previous, Return |
| Apply settings | Apply | Confirm, OK, Done |
| Destructive | Delete | Remove, Erase (unless specifically removing from a list, not deleting) |
| Exit without saving | Cancel | Close, Dismiss, Abort |
| Reset to defaults | Reset | Clear, Restore |

Rules:
- No articles in button labels ("Save changes" → "Save")
- No ellipsis on buttons that open dialogs — use the action name only
- Maximum 3 words per button label

## Empty states

Pattern: **[What's missing]** (headline) + one sentence of context (body) + action verb CTA (button).

- ❌ "No data available"
- ✅ "No prompts yet" / "Create your first prompt to get started" / "New prompt"
- ❌ "Nothing to show here"
- ✅ "No results for [query]" / "Try a different search term" / (no CTA needed)

## Error messages

Pattern: **What happened** + **what to do**.

- ❌ "Something went wrong"
- ✅ "Prompt failed to save — check your connection and try again"
- ❌ "Invalid input"
- ✅ "Name can't be empty — add a name to continue"

## Placeholder text

Describes format, not action.

- ❌ "Enter your email address"
- ✅ "hello@example.com"
- ❌ "Type your prompt here"
- ✅ "Describe what you want Claude to do..."

## Known AI bias patterns to suppress

These are recurring mistakes AI tools make when generating copy — explicitly blocked:

- Generating "Submit" as a default button label (prefer the specific action)
- Using title case in UI copy ("Save Changes" → "Save changes")
- Generating "No data available" as empty state copy
- Using "Click here" as link text — use descriptive labels
- Adding "Please" to error messages — it adds length without empathy
- Generating "Are you sure?" confirmation dialogs — use specific consequence language ("Delete this prompt? This can't be undone.")
