// EditForm.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import EditForm from "./EditForm";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";

// Mock dependencies

// Mock CustomDropdown to render a simple select element
vi.mock("./CustomDropdown", () => {
  return {
    default: ({ fieldId, FieldName, options, defaultValue, onChange }) => (
      <select
        id={fieldId}
        name={FieldName}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ),
  };
});

// Mock ImageUploader to avoid dealing with actual image uploads
vi.mock("./ImageUploader", () => {
  return {
    default: () => <div>ImageUploaderMock</div>,
  };
});

// Mock WarmthLevelInfo component
vi.mock("./WarmthLevelInfo", () => {
  return {
    default: () => null,
  };
});

// Mock PreferenceInfo component
vi.mock("./PreferenceInfo", () => {
  return {
    default: () => null,
  };
});

// Mock Firebase auth
vi.mock("../utilities/firebase", () => {
  return {
    auth: {
      currentUser: {
        uid: "testUserId",
      },
    },
  };
});

// Mock writeData function
vi.mock("../utilities/database", () => {
  return {
    writeData: vi.fn(),
  };
});

test("warmth level field shows up for certain categories", () => {
  const categories = ["T-Shirt", "Sneakers", "Rain Jacket"];
  const categoriesDict = {
    "T-Shirt": "Tops",
    Sneakers: "Footwear",
    "Rain Jacket": "Outerwear",
  };

  // Render the component
  render(
    <EditForm
      showModal={true}
      setShowModal={() => {}}
      defaultData={{
        category: "T-Shirt",
        warmthLevel: 0,
        color: "#000000",
        preference: 5,
        image: "",
      }}
      categories={categories}
      categoriesDict={categoriesDict}
      editing={false}
    />
  );

  // Check that the warmth level field is displayed initially
  expect(screen.getByLabelText("Warmth Level")).toBeInTheDocument();

  // Change the category to "Sneakers" (Footwear)
  fireEvent.change(screen.getByLabelText("Category"), {
    target: { value: "Sneakers" },
  });

  // The warmth level field should not be displayed
  expect(screen.queryByLabelText("Warmth Level")).not.toBeInTheDocument();

  // Change the category to "Rain Jacket"
  fireEvent.change(screen.getByLabelText("Category"), {
    target: { value: "Rain Jacket" },
  });

  // The warmth level field should not be displayed
  expect(screen.queryByLabelText("Warmth Level")).not.toBeInTheDocument();

  // Change the category back to "T-Shirt"
  fireEvent.change(screen.getByLabelText("Category"), {
    target: { value: "T-Shirt" },
  });

  // The warmth level field should be displayed again
  expect(screen.getByLabelText("Warmth Level")).toBeInTheDocument();
});
